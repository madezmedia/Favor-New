import axios from 'axios';
import { db } from '@/lib/db';
import { teams } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

const ODDS_API_KEY = import.meta.env.VITE_ODDS_API_KEY;

interface OddsAPITeam {
  teamID: string;
  teamName: string;
  teamNameAlt: string;
  teamCity: string;
  teamAbbrev: string;
  conference: string;
  division: string;
  teamLogo?: string;
}

const api = axios.create({
  baseURL: 'https://api.sportsgameodds.com/v1',
  params: {
    apikey: ODDS_API_KEY,
  },
});

export async function fetchAndMapTeams() {
  try {
    const { data } = await api.get('/teams', {
      params: {
        leagueID: 'NBA',
      },
    });

    const mappedTeams = data.teams.map((team: OddsAPITeam) => ({
      id: crypto.randomUUID(),
      name: team.teamName,
      abbreviation: team.teamAbbrev,
      location: team.teamCity,
      conference: team.conference,
      division: team.division,
      logo: team.teamLogo || `https://a.espncdn.com/i/teamlogos/nba/500/${team.teamAbbrev.toLowerCase()}.png`,
      nbaApiId: '', // Will be populated when NBA API data is available
      oddsApiId: team.teamID,
      rapidApiId: '', // Will be populated when RapidAPI data is available
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    // Insert teams into database
    const result = await db.insert(teams).values(mappedTeams)
      .onConflictDoUpdate({
        target: teams.oddsApiId,
        set: {
          name: sql`excluded.name`,
          abbreviation: sql`excluded.abbreviation`,
          location: sql`excluded.location`,
          conference: sql`excluded.conference`,
          division: sql`excluded.division`,
          logo: sql`excluded.logo`,
          updatedAt: sql`excluded.updated_at`,
        },
      });

    return result;
  } catch (error) {
    console.error('Error fetching and mapping teams:', error);
    throw error;
  }
}