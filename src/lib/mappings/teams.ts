import { z } from 'zod';
import { supabase } from '@/lib/supabase';

// Base URLs for team assets
export const BASE_URLS = {
  ESPN: 'https://a.espncdn.com/i/teamlogos/nba/500',
  NBA: 'https://cdn.nba.com/logos/nba',
  RAPID: 'https://nba-api-free-data.p.rapidapi.com/team-logo',
} as const;

// Team information with full details
export const TEAM_INFO = {
  ATL: { fullName: 'Atlanta Hawks', city: 'Atlanta', nickname: 'Hawks', color: '1D428A', alternateColor: 'C8102E' },
  BOS: { fullName: 'Boston Celtics', city: 'Boston', nickname: 'Celtics', color: '008348', alternateColor: 'BB9753' },
  BKN: { fullName: 'Brooklyn Nets', city: 'Brooklyn', nickname: 'Nets', color: '000000', alternateColor: 'FFFFFF' },
  CHA: { fullName: 'Charlotte Hornets', city: 'Charlotte', nickname: 'Hornets', color: '1D1160', alternateColor: '00788C' },
  CHI: { fullName: 'Chicago Bulls', city: 'Chicago', nickname: 'Bulls', color: 'CE1141', alternateColor: '000000' },
  CLE: { fullName: 'Cleveland Cavaliers', city: 'Cleveland', nickname: 'Cavaliers', color: '860038', alternateColor: '041E42' },
  DAL: { fullName: 'Dallas Mavericks', city: 'Dallas', nickname: 'Mavericks', color: '00538C', alternateColor: '002B5E' },
  DEN: { fullName: 'Denver Nuggets', city: 'Denver', nickname: 'Nuggets', color: '0E2240', alternateColor: 'FEC524' },
  DET: { fullName: 'Detroit Pistons', city: 'Detroit', nickname: 'Pistons', color: 'C8102E', alternateColor: '1D42BA' },
  GSW: { fullName: 'Golden State Warriors', city: 'Golden State', nickname: 'Warriors', color: '1D428A', alternateColor: 'FFC72C' },
  HOU: { fullName: 'Houston Rockets', city: 'Houston', nickname: 'Rockets', color: 'CE1141', alternateColor: '000000' },
  IND: { fullName: 'Indiana Pacers', city: 'Indiana', nickname: 'Pacers', color: '002D62', alternateColor: 'FDBB30' },
  LAC: { fullName: 'LA Clippers', city: 'LA', nickname: 'Clippers', color: 'C8102E', alternateColor: '1D428A' },
  LAL: { fullName: 'Los Angeles Lakers', city: 'Los Angeles', nickname: 'Lakers', color: '552583', alternateColor: 'FDB927' },
  MEM: { fullName: 'Memphis Grizzlies', city: 'Memphis', nickname: 'Grizzlies', color: '5D76A9', alternateColor: '12173F' },
  MIA: { fullName: 'Miami Heat', city: 'Miami', nickname: 'Heat', color: '98002E', alternateColor: 'F9A01B' },
  MIL: { fullName: 'Milwaukee Bucks', city: 'Milwaukee', nickname: 'Bucks', color: '00471B', alternateColor: 'EEE1C6' },
  MIN: { fullName: 'Minnesota Timberwolves', city: 'Minnesota', nickname: 'Timberwolves', color: '0C2340', alternateColor: '236192' },
  NOP: { fullName: 'New Orleans Pelicans', city: 'New Orleans', nickname: 'Pelicans', color: '0C2340', alternateColor: 'C8102E' },
  NYK: { fullName: 'New York Knicks', city: 'New York', nickname: 'Knicks', color: '006BB6', alternateColor: 'F58426' },
  OKC: { fullName: 'Oklahoma City Thunder', city: 'Oklahoma City', nickname: 'Thunder', color: '007AC1', alternateColor: 'EF3B24' },
  ORL: { fullName: 'Orlando Magic', city: 'Orlando', nickname: 'Magic', color: '0077C0', alternateColor: 'C4CED4' },
  PHI: { fullName: 'Philadelphia 76ers', city: 'Philadelphia', nickname: '76ers', color: '006BB6', alternateColor: 'ED174C' },
  PHX: { fullName: 'Phoenix Suns', city: 'Phoenix', nickname: 'Suns', color: '1D1160', alternateColor: 'E56020' },
  POR: { fullName: 'Portland Trail Blazers', city: 'Portland', nickname: 'Trail Blazers', color: 'E03A3E', alternateColor: '000000' },
  SAC: { fullName: 'Sacramento Kings', city: 'Sacramento', nickname: 'Kings', color: '5A2D81', alternateColor: '63727A' },
  SAS: { fullName: 'San Antonio Spurs', city: 'San Antonio', nickname: 'Spurs', color: 'C4CED4', alternateColor: '000000' },
  TOR: { fullName: 'Toronto Raptors', city: 'Toronto', nickname: 'Raptors', color: 'CE1141', alternateColor: '000000' },
  UTA: { fullName: 'Utah Jazz', city: 'Utah', nickname: 'Jazz', color: '002B5C', alternateColor: '00471B' },
  WAS: { fullName: 'Washington Wizards', city: 'Washington', nickname: 'Wizards', color: '002B5C', alternateColor: 'E31837' },
} as const;

// Team mappings between different APIs
export const TEAM_MAPPINGS = {
  'ATL': { nbaId: '1', oddsId: 'ATL', rapidId: '1', name: 'Hawks' },
  'BOS': { nbaId: '2', oddsId: 'BOS', rapidId: '2', name: 'Celtics' },
  'BKN': { nbaId: '17', oddsId: 'BKN', rapidId: '17', name: 'Nets' },
  'CHA': { nbaId: '30', oddsId: 'CHA', rapidId: '30', name: 'Hornets' },
  'CHI': { nbaId: '4', oddsId: 'CHI', rapidId: '4', name: 'Bulls' },
  'CLE': { nbaId: '5', oddsId: 'CLE', rapidId: '5', name: 'Cavaliers' },
  'DAL': { nbaId: '6', oddsId: 'DAL', rapidId: '6', name: 'Mavericks' },
  'DEN': { nbaId: '7', oddsId: 'DEN', rapidId: '7', name: 'Nuggets' },
  'DET': { nbaId: '8', oddsId: 'DET', rapidId: '8', name: 'Pistons' },
  'GSW': { nbaId: '9', oddsId: 'GSW', rapidId: '9', name: 'Warriors' },
  'HOU': { nbaId: '10', oddsId: 'HOU', rapidId: '10', name: 'Rockets' },
  'IND': { nbaId: '11', oddsId: 'IND', rapidId: '11', name: 'Pacers' },
  'LAC': { nbaId: '12', oddsId: 'LAC', rapidId: '12', name: 'Clippers' },
  'LAL': { nbaId: '13', oddsId: 'LAL', rapidId: '13', name: 'Lakers' },
  'MEM': { nbaId: '29', oddsId: 'MEM', rapidId: '29', name: 'Grizzlies' },
  'MIA': { nbaId: '14', oddsId: 'MIA', rapidId: '14', name: 'Heat' },
  'MIL': { nbaId: '15', oddsId: 'MIL', rapidId: '15', name: 'Bucks' },
  'MIN': { nbaId: '16', oddsId: 'MIN', rapidId: '16', name: 'Timberwolves' },
  'NOP': { nbaId: '3', oddsId: 'NOP', rapidId: '3', name: 'Pelicans' },
  'NYK': { nbaId: '18', oddsId: 'NYK', rapidId: '18', name: 'Knicks' },
  'OKC': { nbaId: '25', oddsId: 'OKC', rapidId: '25', name: 'Thunder' },
  'ORL': { nbaId: '19', oddsId: 'ORL', rapidId: '19', name: 'Magic' },
  'PHI': { nbaId: '20', oddsId: 'PHI', rapidId: '20', name: '76ers' },
  'PHX': { nbaId: '21', oddsId: 'PHX', rapidId: '21', name: 'Suns' },
  'POR': { nbaId: '22', oddsId: 'POR', rapidId: '22', name: 'Trail Blazers' },
  'SAC': { nbaId: '23', oddsId: 'SAC', rapidId: '23', name: 'Kings' },
  'SAS': { nbaId: '24', oddsId: 'SAS', rapidId: '24', name: 'Spurs' },
  'TOR': { nbaId: '28', oddsId: 'TOR', rapidId: '28', name: 'Raptors' },
  'UTA': { nbaId: '26', oddsId: 'UTA', rapidId: '26', name: 'Jazz' },
  'WAS': { nbaId: '27', oddsId: 'WAS', rapidId: '27', name: 'Wizards' },
} as const;

// Reverse mappings for looking up by different API IDs
export const REVERSE_TEAM_MAPPINGS = {
  nba: Object.entries(TEAM_MAPPINGS).reduce((acc, [abbr, { nbaId }]) => {
    acc[nbaId] = abbr;
    return acc;
  }, {} as Record<string, string>),
  
  odds: Object.entries(TEAM_MAPPINGS).reduce((acc, [abbr, { oddsId }]) => {
    acc[oddsId] = abbr;
    return acc;
  }, {} as Record<string, string>),
  
  rapid: Object.entries(TEAM_MAPPINGS).reduce((acc, [abbr, { rapidId }]) => {
    acc[rapidId] = abbr;
    return acc;
  }, {} as Record<string, string>),
};

// Team schema for validation
export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  abbreviation: z.string(),
  location: z.string(),
  conference: z.string(),
  division: z.string(),
  color: z.string().optional(),
  alternateColor: z.string().optional(),
  logos: z.object({
    primary: z.string(),
    dark: z.string().optional(),
    light: z.string().optional(),
  }),
  externalIds: z.object({
    nbaId: z.string(),
    oddsId: z.string(),
    rapidId: z.string(),
  }),
});

export type Team = z.infer<typeof TeamSchema>;

// Get team logos with fallbacks
export function getTeamLogos(teamId: string) {
  const normalizedId = teamId.toUpperCase();
  const espnUrl = `${BASE_URLS.ESPN}/${normalizedId.toLowerCase()}.png`;
  
  return {
    primary: espnUrl,
    dark: `${BASE_URLS.NBA}/${normalizedId.toLowerCase()}/primary/L/logo.svg`,
    light: espnUrl,
  };
}

// Map team ID between different APIs
export async function mapTeamId(teamId: string, source: 'nba' | 'odds' | 'rapid'): Promise<string | undefined> {
  try {
    const { data: team, error } = await supabase
      .from('teams')
      .select('abbreviation')
      .eq(source === 'nba' ? 'nba_api_id' : source === 'odds' ? 'odds_api_id' : 'rapid_api_id', teamId)
      .single();

    if (error) throw error;
    return team?.abbreviation;
  } catch (error) {
    console.error('Error mapping team ID:', error);
    
    // Fallback to static mappings
    return REVERSE_TEAM_MAPPINGS[source][teamId];
  }
}

// Get full team details
export async function getTeamDetails(teamId: string) {
  try {
    const { data: team, error } = await supabase
      .from('teams')
      .select('*')
      .eq('abbreviation', teamId.toUpperCase())
      .single();

    if (error) throw error;

    const logos = getTeamLogos(teamId);
    const mapping = TEAM_MAPPINGS[teamId.toUpperCase()];
    const info = TEAM_INFO[teamId.toUpperCase()];
    
    return {
      ...team,
      ...info,
      logos,
      externalIds: {
        nbaId: mapping?.nbaId || team.nba_api_id,
        oddsId: mapping?.oddsId || team.odds_api_id,
        rapidId: mapping?.rapidId || team.rapid_api_id,
      },
    };
  } catch (error) {
    console.error('Error getting team details:', error);
    
    // Fallback to static mapping
    const mapping = TEAM_MAPPINGS[teamId.toUpperCase()];
    const info = TEAM_INFO[teamId.toUpperCase()];
    if (mapping && info) {
      return {
        id: teamId,
        name: mapping.name,
        abbreviation: teamId.toUpperCase(),
        ...info,
        logos: getTeamLogos(teamId),
        externalIds: {
          nbaId: mapping.nbaId,
          oddsId: mapping.oddsId,
          rapidId: mapping.rapidId,
        },
      };
    }
    return null;
  }
}