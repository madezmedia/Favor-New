import axios from 'axios';
import type { ApiResponse, ApiEvent } from '@/types/api';
import { parseOddsString } from './mappings/odds';

const ODDS_API_KEY = import.meta.env.VITE_ODDS_API_KEY;

if (!ODDS_API_KEY) {
  throw new Error('ODDS_API_KEY is required');
}

const api = axios.create({
  baseURL: 'https://api.sportsgameodds.com/v1',
  headers: {
    'X-Api-Key': ODDS_API_KEY,
  },
});

// Add request/response interceptors for debugging
api.interceptors.request.use(
  (config) => {
    console.debug('API Request:', {
      url: config.url,
      params: config.params,
    });
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.debug('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export async function fetchNBAEvents(type: 'live' | 'upcoming' = 'live'): Promise<ApiResponse<ApiEvent>> {
  try {
    const { data } = await api.get<ApiResponse<ApiEvent>>('/events', {
      params: {
        leagueID: 'NBA',
        type,
        marketOddsAvailable: true,
      },
    });

    // Log the raw response for debugging
    console.debug('Raw NBA Events Response:', data);

    return data;
  } catch (error) {
    console.error('Error fetching NBA events:', error);
    throw error;
  }
}

export async function fetchEventOdds(eventId: string) {
  try {
    const { data } = await api.get(`/events/${eventId}/odds`);
    
    // Log the raw response for debugging
    console.debug('Raw Event Odds Response:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching event odds:', error);
    throw error;
  }
}

// Transform API response to our app's data structure
export function transformEventData(event: ApiEvent) {
  // Get moneyline odds
  const moneylineOdds = Object.values(event.odds).find(
    odd => odd.betTypeID === 'ml'
  );

  // Get spread odds
  const spreadOdds = Object.values(event.odds).find(
    odd => odd.betTypeID === 'sp'
  );

  // Get total odds
  const totalOdds = Object.values(event.odds).find(
    odd => odd.betTypeID === 'ou'
  );

  return {
    id: event.eventID,
    startTime: event.status.startsAt,
    sport: 'NBA',
    league: event.leagueID,
    status: event.status.displayShort,
    homeTeam: {
      id: event.teams.home.teamID,
      name: event.teams.home.names.long,
      score: event.teams.home.score,
    },
    awayTeam: {
      id: event.teams.away.teamID,
      name: event.teams.away.names.long,
      score: event.teams.away.score,
    },
    markets: {
      moneyline: {
        home: parseOddsString(moneylineOdds?.odds || '0'),
        away: parseOddsString(moneylineOdds?.odds || '0'),
      },
      spread: {
        home: parseOddsString(spreadOdds?.overUnder || '0'),
        away: -parseOddsString(spreadOdds?.overUnder || '0'),
        homeOdds: parseOddsString(spreadOdds?.odds || '-110'),
        awayOdds: parseOddsString(spreadOdds?.bookOdds || '-110'),
      },
      total: {
        over: parseOddsString(totalOdds?.odds || '-110'),
        under: parseOddsString(totalOdds?.bookOdds || '-110'),
        line: parseOddsString(totalOdds?.overUnder || '0'),
      },
    },
  };
}