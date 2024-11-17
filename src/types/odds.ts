import { z } from 'zod';

export interface GameOdds {
  id: string;
  startTime: string;
  sport: string;
  league: string;
  status: string;
  homeTeam: {
    id: string;
    name: string;
    score?: number;
  };
  awayTeam: {
    id: string;
    name: string;
    score?: number;
  };
  markets: {
    moneyline: {
      home: number;
      away: number;
    };
    spread: {
      home: number;
      away: number;
      homeOdds: number;
      awayOdds: number;
    };
    total: {
      over: number;
      under: number;
      line: number;
    };
  };
}

export interface OddsData {
  gameId: string;
  timestamp: string;
  bookmaker: string;
  market: string;
  odds: number;
  line?: number;
  probability: number;
  movement: 'up' | 'down' | 'none';
}

export interface BookmakerOdds {
  bookmaker: string;
  lastUpdate: string;
  markets: {
    moneyline?: {
      home: number;
      away: number;
    };
    spread?: {
      home: number;
      away: number;
      homeOdds: number;
      awayOdds: number;
    };
    total?: {
      over: number;
      under: number;
      line: number;
    };
  };
}

export interface PlayerProps {
  player: {
    id: string;
    name: string;
    team: string;
    position: string;
  };
  market: string;
  market_label: string;
  selections: Array<{
    label: string;
    line: number;
    odds: number;
    probability: number;
    books: Array<{
      id: string;
      bookie: string;
      line: {
        line: number;
        cost: number;
      };
    }>;
  }>;
}

export type MarketType = 'Points' | 'Assists' | 'Rebounds' | 'Blocks' | 'Steals' | 'Three Points Made';

export interface PlayerMarketOdds {
  [market: string]: {
    over: Array<{
      id: string;
      bookie: string;
      line: {
        line: number;
        cost: number;
      };
    }>;
    under: Array<{
      id: string;
      bookie: string;
      line: {
        line: number;
        cost: number;
      };
    }>;
  };
}