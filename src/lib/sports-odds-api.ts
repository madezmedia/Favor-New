import axios from 'axios';
import type { GameOdds, BookmakerOdds, OddsData, PlayerProps } from '@/types/odds';

const ODDS_API_KEY = import.meta.env.VITE_ODDS_API_KEY;

// API Configuration
const API_CONFIG = {
  baseURL: 'https://api.sportsgameodds.com/v1',
  league: 'NBA',
  defaultParams: {
    leagueID: 'NBA',
    marketOddsAvailable: true,
  },
  cache: {
    live: 15 * 1000, // 15 seconds
    upcoming: 60 * 1000, // 1 minute
    odds: 30 * 1000, // 30 seconds
    movements: 60 * 1000, // 1 minute
  },
  rateLimit: {
    maxRequests: 30,
    interval: 60 * 1000, // 1 minute
  },
};

// Cache implementation
const cache = new Map<string, {
  data: any;
  timestamp: number;
}>();

// Rate limiting
let requestCount = 0;
let lastReset = Date.now();

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'X-Api-Key': ODDS_API_KEY,
  },
  params: API_CONFIG.defaultParams,
});

// Debug interceptor
api.interceptors.request.use(
  (config) => {
    console.debug('API Request:', {
      url: config.url,
      params: config.params,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
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

// Rate limiting check
const checkRateLimit = () => {
  const now = Date.now();
  if (now - lastReset >= API_CONFIG.rateLimit.interval) {
    requestCount = 0;
    lastReset = now;
  }

  if (requestCount >= API_CONFIG.rateLimit.maxRequests) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }

  requestCount++;
};

// Cache implementation
const withCache = async <T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number
): Promise<T> => {
  const cached = cache.get(key);
  const now = Date.now();

  if (cached && now - cached.timestamp < ttl) {
    console.debug('Cache hit:', key);
    return cached.data as T;
  }

  console.debug('Cache miss:', key);
  checkRateLimit();
  const data = await fetchFn();
  
  cache.set(key, {
    data,
    timestamp: now,
  });

  return data;
};

// Mock data for development
const MOCK_DATA = {
  games: [
    {
      id: '1',
      startTime: new Date(Date.now() + 3600000).toISOString(),
      sport: 'NBA',
      league: 'NBA',
      status: 'scheduled',
      homeTeam: {
        id: 'LAL',
        name: 'Los Angeles Lakers',
        score: 0,
      },
      awayTeam: {
        id: 'GSW',
        name: 'Golden State Warriors',
        score: 0,
      },
      markets: {
        moneyline: {
          home: -110,
          away: -110,
        },
        spread: {
          home: -3.5,
          away: 3.5,
          homeOdds: -110,
          awayOdds: -110,
        },
        total: {
          over: -110,
          under: -110,
          line: 224.5,
        },
      },
    },
  ],
  bookmakers: [
    {
      bookmaker: "FanDuel",
      lastUpdate: new Date().toISOString(),
      markets: {
        moneyline: { home: -110, away: -110 },
        spread: { home: -3.5, away: 3.5, homeOdds: -110, awayOdds: -110 },
        total: { over: -110, under: -110, line: 224.5 },
      },
    },
  ],
  movements: [
    {
      gameId: '1',
      timestamp: new Date().toISOString(),
      bookmaker: 'FanDuel',
      market: 'spread',
      odds: -110,
      line: -3.5,
      probability: 0.52,
      movement: 'up',
    },
  ],
};

// API Functions
export async function fetchLiveEvents(type: 'live' | 'upcoming' = 'live'): Promise<GameOdds[]> {
  const cacheKey = `nba-events-${type}`;
  const ttl = type === 'live' ? API_CONFIG.cache.live : API_CONFIG.cache.upcoming;

  try {
    return await withCache(
      cacheKey,
      async () => {
        if (process.env.NODE_ENV === 'development') {
          console.debug('Using mock data for development');
          return MOCK_DATA.games;
        }

        const { data } = await api.get('/events', {
          params: {
            type,
            leagueID: API_CONFIG.league,
          },
        });

        return data.events.map((event: any) => ({
          id: event.id,
          startTime: event.startTime,
          sport: API_CONFIG.league,
          league: API_CONFIG.league,
          status: event.status,
          homeTeam: {
            id: event.homeTeam.id,
            name: event.homeTeam.name,
            score: event.homeTeam.score,
          },
          awayTeam: {
            id: event.awayTeam.id,
            name: event.awayTeam.name,
            score: event.awayTeam.score,
          },
          markets: {
            moneyline: {
              home: event.markets?.moneyline?.home || 0,
              away: event.markets?.moneyline?.away || 0,
            },
            spread: {
              home: event.markets?.spread?.home || 0,
              away: event.markets?.spread?.away || 0,
              homeOdds: event.markets?.spread?.homeOdds || -110,
              awayOdds: event.markets?.spread?.awayOdds || -110,
            },
            total: {
              over: event.markets?.total?.over || -110,
              under: event.markets?.total?.under || -110,
              line: event.markets?.total?.line || 0,
            },
          },
        }));
      },
      ttl
    );
  } catch (error) {
    console.error('Error fetching NBA events:', error);
    return MOCK_DATA.games;
  }
}

export async function fetchEventOdds(gameId: string): Promise<BookmakerOdds[]> {
  const cacheKey = `nba-odds-${gameId}`;
  
  try {
    return await withCache(
      cacheKey,
      async () => {
        if (process.env.NODE_ENV === 'development') {
          return MOCK_DATA.bookmakers;
        }

        const { data } = await api.get(`/events/${gameId}/odds`);
        return data.bookmakers;
      },
      API_CONFIG.cache.odds
    );
  } catch (error) {
    console.error('Error fetching NBA odds:', error);
    return MOCK_DATA.bookmakers;
  }
}

export async function fetchLineMovements(gameId: string): Promise<OddsData[]> {
  const cacheKey = `nba-movements-${gameId}`;
  
  try {
    return await withCache(
      cacheKey,
      async () => {
        if (process.env.NODE_ENV === 'development') {
          return MOCK_DATA.movements;
        }

        const { data } = await api.get(`/events/${gameId}/line-history`);
        return data.movements;
      },
      API_CONFIG.cache.movements
    );
  } catch (error) {
    console.error('Error fetching NBA line movements:', error);
    return MOCK_DATA.movements;
  }
}

export async function fetchPlayerProps(gameId: string): Promise<PlayerProps[]> {
  const cacheKey = `nba-props-${gameId}`;
  
  try {
    return await withCache(
      cacheKey,
      async () => {
        if (process.env.NODE_ENV === 'development') {
          return [];
        }

        const { data } = await api.get(`/events/${gameId}/player-props`);
        return data.props;
      },
      API_CONFIG.cache.movements
    );
  } catch (error) {
    console.error('Error fetching NBA player props:', error);
    return [];
  }
}