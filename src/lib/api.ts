import axios from 'axios';
import { GameOdds, OddsData, BookmakerOdds, PlayerProps, TeamDetails } from '@/types';

const NBA_API_KEY = import.meta.env.VITE_NBA_API_KEY;
const ODDS_API_KEY = import.meta.env.VITE_ODDS_API_KEY;

// NBA API client
const nbaApi = axios.create({
  baseURL: 'https://nba-api-free-data.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': NBA_API_KEY,
    'X-RapidAPI-Host': 'nba-api-free-data.p.rapidapi.com',
  },
});

// Sports Odds API client
const oddsApi = axios.create({
  baseURL: 'https://api.sportsgameodds.com',
  params: {
    apikey: ODDS_API_KEY,
  },
});

// Error handler with specific error messages
function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.response?.data?.error;

    switch (status) {
      case 401:
        throw new Error('Invalid API key. Please check your configuration.');
      case 429:
        throw new Error('Rate limit exceeded. Please try again later.');
      case 500:
        throw new Error('API is currently unavailable. Please try again later.');
      default:
        throw new Error(message || 'Failed to fetch data. Please try again.');
    }
  }
  throw error;
}

export async function fetchTeams() {
  try {
    const { data } = await nbaApi.get('/nba-team-list');
    return data.teams.map((team: any) => ({
      id: team.id,
      abbreviation: team.abbreviation,
      displayName: team.displayName,
      shortDisplayName: team.shortDisplayName,
      location: team.location,
      color: team.color,
      alternateColor: team.alternateColor,
    }));
  } catch (error) {
    handleApiError(error);
    return [];
  }
}

export async function fetchTeamLogo(teamId: string) {
  try {
    const { data } = await nbaApi.get('/team-logo', {
      params: { teamid: teamId },
    });
    return data.logo;
  } catch (error) {
    handleApiError(error);
    return null;
  }
}

export async function fetchTeamDetails(teamId: string): Promise<TeamDetails> {
  try {
    const { data } = await nbaApi.get('/nba-team-info/v1/data', {
      params: { id: teamId },
    });

    return {
      timestamp: data.timestamp,
      status: data.status,
      season: data.season,
      coach: data.coach,
      team: {
        id: data.team.id,
        abbreviation: data.team.abbreviation,
        location: data.team.location,
        name: data.team.name,
        displayName: data.team.displayName,
        clubhouse: data.team.clubhouse,
        color: data.team.color,
        logo: data.team.logo,
        recordSummary: data.team.recordSummary,
        seasonSummary: data.team.seasonSummary,
        standingSummary: data.team.standingSummary,
      },
    };
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function fetchTeamPlayers(teamId: string) {
  try {
    const { data } = await nbaApi.get('/nba-player-listing/v1/data', {
      params: { id: teamId },
    });
    return data.athletes;
  } catch (error) {
    handleApiError(error);
    return [];
  }
}

export async function fetchLiveEvents(type: 'live' | 'upcoming' = 'live'): Promise<GameOdds[]> {
  try {
    const { data } = await oddsApi.get('/sports/basketball/nba/live');
    return data.events.map((game: any) => ({
      id: game.id,
      startTime: game.startTime,
      sport: 'NBA',
      league: 'NBA',
      status: 'live',
      homeTeam: {
        id: game.homeTeam.id,
        name: game.homeTeam.name,
        score: game.homeTeam.score || 0,
      },
      awayTeam: {
        id: game.awayTeam.id,
        name: game.awayTeam.name,
        score: game.awayTeam.score || 0,
      },
      markets: {
        moneyline: {
          home: game.odds?.moneyline?.home || 0,
          away: game.odds?.moneyline?.away || 0,
        },
        spread: {
          home: game.odds?.spread?.home || 0,
          away: game.odds?.spread?.away || 0,
          homeOdds: game.odds?.spread?.homeOdds || 0,
          awayOdds: game.odds?.spread?.awayOdds || 0,
        },
        total: {
          over: game.odds?.total?.over || 0,
          under: game.odds?.total?.under || 0,
          line: game.odds?.total?.line || 0,
        },
      },
    }));
  } catch (error) {
    handleApiError(error);
    return [];
  }
}

export async function fetchEventOdds(gameId: string): Promise<BookmakerOdds[]> {
  try {
    const { data } = await oddsApi.get(`/events/${gameId}/odds`);
    return data.bookmakers;
  } catch (error) {
    handleApiError(error);
    return [];
  }
}

export async function fetchLineMovements(gameId: string): Promise<OddsData[]> {
  try {
    const { data } = await oddsApi.get(`/events/${gameId}/line-history`);
    return data.movements;
  } catch (error) {
    handleApiError(error);
    return [];
  }
}

export async function fetchPlayerOdds(gameId: string): Promise<PlayerProps[]> {
  try {
    const { data } = await oddsApi.get(`/events/${gameId}/player-props`);
    return data.props.map((prop: any) => ({
      player: {
        id: prop.player.id,
        name: prop.player.name,
        team: prop.player.team,
        position: prop.player.position,
      },
      market: prop.market,
      market_label: prop.market_label,
      selections: prop.selections.map((selection: any) => ({
        label: selection.label,
        line: selection.line,
        odds: selection.odds,
        probability: selection.probability,
        books: selection.books.map((book: any) => ({
          id: book.id,
          bookie: book.bookie,
          line: {
            line: book.line.line,
            cost: book.line.cost,
          },
        })),
      })),
    }));
  } catch (error) {
    handleApiError(error);
    return [];
  }
}

export async function getAIAnalysis(prompt: string): Promise<string> {
  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  try {
    const { data } = await axios.post(
      'https://openrouter.ai/api/v1/chat',
      {
        model: 'anthropic/claude-3-haiku',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return data.choices[0].message.content;
  } catch (error) {
    handleApiError(error);
    return '';
  }
}