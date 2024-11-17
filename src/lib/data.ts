import { NBATeam, Game } from '@/types';

// Simulated data service
const MOCK_GAMES: Game[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    homeTeam: {
      id: '1',
      abbreviation: 'LAL',
      displayName: 'Los Angeles Lakers',
      shortDisplayName: 'Lakers',
      location: 'Los Angeles',
      color: '552583',
      alternateColor: 'FDB927',
      logo: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
    },
    awayTeam: {
      id: '2',
      abbreviation: 'BOS',
      displayName: 'Boston Celtics',
      shortDisplayName: 'Celtics',
      location: 'Boston',
      color: '008348',
      alternateColor: 'BB9753',
      logo: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png',
    },
    homeSpread: -3.5,
    awaySpread: 3.5,
    homeOdds: -150,
    awayOdds: +130,
    overUnder: 224.5,
  },
  {
    id: '2',
    date: new Date().toISOString(),
    homeTeam: {
      id: '3',
      abbreviation: 'GSW',
      displayName: 'Golden State Warriors',
      shortDisplayName: 'Warriors',
      location: 'Golden State',
      color: '1D428A',
      alternateColor: 'FFC72C',
      logo: 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png',
    },
    awayTeam: {
      id: '4',
      abbreviation: 'LAC',
      displayName: 'LA Clippers',
      shortDisplayName: 'Clippers',
      location: 'Los Angeles',
      color: '1D428A',
      alternateColor: 'C8102E',
      logo: 'https://a.espncdn.com/i/teamlogos/nba/500/lac.png',
    },
    homeSpread: -1.5,
    awaySpread: 1.5,
    homeOdds: -110,
    awayOdds: -110,
    overUnder: 233.5,
  },
];

export async function fetchTodaysGames(): Promise<Game[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return MOCK_GAMES;
}

export async function fetchNBATeams(): Promise<NBATeam[]> {
  const response = await fetch('https://nba-api-free-data.p.rapidapi.com/nba-team-list', {
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_NBA_API_KEY,
      'x-rapidapi-host': 'nba-api-free-data.p.rapidapi.com',
    },
  });
  const data = await response.json();
  return data.teams.map((team: any) => ({
    id: team.id,
    abbreviation: team.abbreviation,
    displayName: team.displayName,
    shortDisplayName: team.shortDisplayName,
    location: team.location,
    color: team.color,
    alternateColor: team.alternateColor,
    logo: team.logos[0].href,
  }));
}