// Team ID mappings across different APIs
export const TEAM_ID_MAPPINGS = {
  // NBA API Free Data IDs to Props API IDs
  '1': 'ATL',  // Atlanta Hawks
  '2': 'BOS',  // Boston Celtics
  '17': 'BKN', // Brooklyn Nets
  '30': 'CHA', // Charlotte Hornets
  '4': 'CHI',  // Chicago Bulls
  '5': 'CLE',  // Cleveland Cavaliers
  '6': 'DAL',  // Dallas Mavericks
  '7': 'DEN',  // Denver Nuggets
  '8': 'DET',  // Detroit Pistons
  '9': 'GSW',  // Golden State Warriors
  '10': 'HOU', // Houston Rockets
  '11': 'IND', // Indiana Pacers
  '12': 'LAC', // LA Clippers
  '13': 'LAL', // Los Angeles Lakers
  '29': 'MEM', // Memphis Grizzlies
  '14': 'MIA', // Miami Heat
  '15': 'MIL', // Milwaukee Bucks
  '16': 'MIN', // Minnesota Timberwolves
  '3': 'NOR',  // New Orleans Pelicans
  '18': 'NYK', // New York Knicks
  '25': 'OKC', // Oklahoma City Thunder
  '19': 'ORL', // Orlando Magic
  '20': 'PHI', // Philadelphia 76ers
  '21': 'PHX', // Phoenix Suns
  '22': 'POR', // Portland Trail Blazers
  '23': 'SAC', // Sacramento Kings
  '24': 'SAS', // San Antonio Spurs
  '28': 'TOR', // Toronto Raptors
  '26': 'UTA', // Utah Jazz
  '27': 'WSH', // Washington Wizards
} as const;

// Reverse mapping for Props API to NBA API Free Data IDs
export const REVERSE_TEAM_ID_MAPPINGS = Object.entries(TEAM_ID_MAPPINGS).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [value]: key,
  }),
  {} as Record<string, string>
);

export function getNBAApiTeamId(propsApiId: string): string | undefined {
  return REVERSE_TEAM_ID_MAPPINGS[propsApiId];
}

export function getPropsApiTeamId(nbaApiId: string): string | undefined {
  return TEAM_ID_MAPPINGS[nbaApiId as keyof typeof TEAM_ID_MAPPINGS];
}

// Helper function to get team details by any ID type
export function getTeamDetailsByAnyId(id: string) {
  const nbaApiId = id.length <= 2 ? id : getNBAApiTeamId(id);
  const propsApiId = id.length > 2 ? id : getPropsApiTeamId(id);

  return {
    nbaApiId,
    propsApiId,
  };
}