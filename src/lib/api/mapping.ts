import { db } from '@/lib/db';
import { teams } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Map team IDs between different APIs
export async function mapTeamIds(teamId: string, sourceApi: 'odds' | 'nba' | 'rapid') {
  try {
    let team;
    
    switch (sourceApi) {
      case 'odds':
        team = await db.query.teams.findFirst({
          where: eq(teams.oddsApiId, teamId),
        });
        break;
      case 'nba':
        team = await db.query.teams.findFirst({
          where: eq(teams.nbaApiId, teamId),
        });
        break;
      case 'rapid':
        team = await db.query.teams.findFirst({
          where: eq(teams.rapidApiId, teamId),
        });
        break;
    }

    if (!team) {
      throw new Error(`Team not found for ID ${teamId} from ${sourceApi} API`);
    }

    return {
      id: team.id,
      oddsApiId: team.oddsApiId,
      nbaApiId: team.nbaApiId,
      rapidApiId: team.rapidApiId,
    };
  } catch (error) {
    console.error('Error mapping team IDs:', error);
    throw error;
  }
}

// Update external API IDs for a team
export async function updateTeamExternalIds(
  teamId: string,
  externalIds: {
    nbaApiId?: string;
    oddsApiId?: string;
    rapidApiId?: string;
  }
) {
  try {
    const result = await db.update(teams)
      .set({
        ...externalIds,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(teams.id, teamId));

    return result;
  } catch (error) {
    console.error('Error updating team external IDs:', error);
    throw error;
  }
}