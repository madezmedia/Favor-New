export { TEAM_MAPPINGS, TEAM_INFO, REVERSE_TEAM_MAPPINGS } from './teams';
export { findPlayerById, findPlayerByName, normalizePlayerName } from './players';

export function getTeamIdForOddsApi(nbaApiId: string): string | undefined {
  return TEAM_MAPPINGS[nbaApiId as keyof typeof TEAM_MAPPINGS];
}

export function getTeamIdForNbaApi(oddsApiId: string): string | undefined {
  return REVERSE_TEAM_MAPPINGS[oddsApiId];
}

export function getTeamInfo(teamId: string) {
  return TEAM_INFO[teamId as keyof typeof TEAM_INFO];
}

export function normalizeTeamId(teamId: string, targetApi: 'nba' | 'odds' = 'odds'): string | undefined {
  if (targetApi === 'odds') {
    // If it's already in odds format (e.g., 'LAL'), return as is
    if (TEAM_INFO[teamId as keyof typeof TEAM_INFO]) {
      return teamId;
    }
    // Convert from NBA API format
    return getTeamIdForOddsApi(teamId);
  } else {
    // If it's already in NBA API format (e.g., '13'), return as is
    if (TEAM_MAPPINGS[teamId as keyof typeof TEAM_MAPPINGS]) {
      return teamId;
    }
    // Convert from Odds API format
    return getTeamIdForNbaApi(teamId);
  }
}