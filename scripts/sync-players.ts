import { supabase } from '@/lib/supabase';
import { fetchPlayersFromAPI } from '@/lib/api/players';

export async function syncPlayers() {
  try {
    console.log('Starting player sync...');

    // Get all teams from Supabase
    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('id, abbreviation');
    
    if (teamsError) throw teamsError;

    // Fetch and sync players for each team
    for (const team of teams) {
      console.log(`Fetching players for ${team.abbreviation}...`);
      
      const players = await fetchPlayersFromAPI(team.abbreviation);
      
      const mappedPlayers = players.map((player) => ({
        first_name: player.firstName,
        last_name: player.lastName,
        full_name: `${player.firstName} ${player.lastName}`,
        position: player.position,
        number: player.number,
        height: player.height,
        weight: player.weight,
        birth_date: player.birthDate,
        team_id: team.id,
        status: player.status,
        nba_api_id: player.nbaApiId,
        odds_api_id: player.oddsApiId,
        rapid_api_id: player.rapidApiId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

      // Upsert players to Supabase
      const { error } = await supabase
        .from('players')
        .upsert(mappedPlayers, {
          onConflict: 'nba_api_id',
          ignoreDuplicates: false,
        });

      if (error) throw error;
      
      console.log(`Synced ${mappedPlayers.length} players for ${team.abbreviation}`);
      
      // Respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('Player sync completed successfully');
  } catch (error) {
    console.error('Error syncing players:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  syncPlayers();
}

export default syncPlayers;