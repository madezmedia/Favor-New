import axios from 'axios';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const {
  VITE_NBA_API_KEY,
  VITE_ODDS_API_KEY,
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY,
} = process.env;

// Validate required environment variables
if (!VITE_NBA_API_KEY || !VITE_ODDS_API_KEY || !VITE_SUPABASE_URL || !VITE_SUPABASE_ANON_KEY) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

// API clients
const nbaApi = axios.create({
  baseURL: 'https://nba-api-free-data.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': VITE_NBA_API_KEY,
    'X-RapidAPI-Host': 'nba-api-free-data.p.rapidapi.com',
  },
});

const oddsApi = axios.create({
  baseURL: 'https://api.sportsgameodds.com/v1',
  params: {
    apikey: VITE_ODDS_API_KEY, // Add API key as a default parameter
  },
});

async function syncTeams() {
  console.log('Syncing teams...');
  
  try {
    // Fetch teams from both APIs
    const [nbaResponse, oddsResponse] = await Promise.all([
      nbaApi.get('/nba-team-list'),
      oddsApi.get('/teams', { 
        params: { 
          leagueID: 'NBA',
        },
      }),
    ]);

    const nbaTeams = nbaResponse.data?.teams || [];
    const oddsTeams = oddsResponse.data?.teams || [];

    if (!nbaTeams.length) {
      throw new Error('No teams received from NBA API');
    }

    // Map and merge team data
    const teams = nbaTeams.map((nbaTeam) => {
      const oddsTeam = oddsTeams.find((ot) => 
        ot.teamAbbrev?.toUpperCase() === nbaTeam.abbreviation?.toUpperCase()
      );

      return {
        name: nbaTeam.displayName,
        abbreviation: nbaTeam.abbreviation,
        location: nbaTeam.location,
        conference: nbaTeam.conference,
        division: nbaTeam.division,
        color: nbaTeam.color,
        alternate_color: nbaTeam.alternateColor,
        logo: nbaTeam.logos?.[0]?.href || oddsTeam?.teamLogo || '',
        nba_api_id: nbaTeam.id,
        odds_api_id: oddsTeam?.teamID || nbaTeam.id,
        rapid_api_id: nbaTeam.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    });

    console.log(`Mapped ${teams.length} teams`);

    // Upsert teams to Supabase
    const { error } = await supabase
      .from('teams')
      .upsert(teams, {
        onConflict: 'abbreviation',
        ignoreDuplicates: false,
      });

    if (error) throw error;
    console.log(`Successfully synced ${teams.length} teams`);

  } catch (error) {
    console.error('Error syncing teams:', error);
    throw error;
  }
}

async function syncPlayers() {
  console.log('Syncing players...');

  try {
    // Get teams from Supabase
    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('id, nba_api_id');

    if (teamsError) throw teamsError;

    // Fetch and sync players for each team
    for (const team of teams) {
      console.log(`Fetching players for team ${team.nba_api_id}...`);

      try {
        const { data } = await nbaApi.get('/nba-player-listing/v1/data', {
          params: { id: team.nba_api_id },
        });

        if (!data?.athletes) {
          console.warn(`No players found for team ${team.nba_api_id}`);
          continue;
        }

        const players = data.athletes.map((player: any) => ({
          first_name: player.firstName,
          last_name: player.lastName,
          full_name: player.displayName,
          position: player.position.abbreviation,
          number: player.jersey,
          height: player.height,
          weight: player.weight,
          birth_date: player.birthDate,
          team_id: team.id,
          status: player.status.name === 'Active' ? 'ACTIVE' : 'INACTIVE',
          nba_api_id: player.id,
          odds_api_id: player.id,
          rapid_api_id: player.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));

        // Upsert players to Supabase
        const { error } = await supabase
          .from('players')
          .upsert(players, {
            onConflict: 'nba_api_id',
            ignoreDuplicates: false,
          });

        if (error) throw error;
        console.log(`Synced ${players.length} players for team ${team.nba_api_id}`);

      } catch (error) {
        console.error(`Error syncing players for team ${team.nba_api_id}:`, error);
        // Continue with next team
        continue;
      }

      // Respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('Player sync completed');

  } catch (error) {
    console.error('Error syncing players:', error);
    throw error;
  }
}

async function syncAll() {
  try {
    console.log('Starting data sync...');
    await syncTeams();
    await syncPlayers();
    console.log('Data sync completed successfully');
  } catch (error) {
    console.error('Error during data sync:', error);
    process.exit(1);
  }
}

// Run if called directly
syncAll();