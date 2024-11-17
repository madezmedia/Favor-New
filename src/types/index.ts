import { BookmakerOdds, GameOdds, OddsData } from './odds';

export interface NBATeam {
  id: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  location: string;
  color: string;
  alternateColor: string;
  logo: string;
}

export interface Game {
  id: string;
  date: string;
  homeTeam: NBATeam;
  awayTeam: NBATeam;
  homeSpread: number;
  awaySpread: number;
  homeOdds: number;
  awayOdds: number;
  overUnder: number;
}

export interface DailyEvent {
  Date: string;
  id: number;
  sport: string;
  teams: {
    home: {
      abbreviation: string;
      city: string;
      name: string;
      logo?: string;
    };
    away: {
      abbreviation: string;
      city: string;
      name: string;
      logo?: string;
    };
  };
}

export type BetType = 'Spread' | 'Moneyline' | 'Over/Under' | 'Parlay';

export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  experience: number;
}

export interface Season {
  year: number;
  displayName: string;
  type: number;
  name: string;
}

export interface TeamDetails {
  timestamp: string;
  status: string;
  season: Season;
  coach: Coach[];
  team: {
    id: string;
    abbreviation: string;
    location: string;
    name: string;
    displayName: string;
    clubhouse: string;
    color: string;
    logo: string;
    recordSummary: string;
    seasonSummary: string;
    standingSummary: string;
  };
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  jersey: string;
  position: {
    name: string;
    abbreviation: string;
  };
  height: number;
  weight: number;
  birthDate: string;
  age: number;
  experience: {
    years: number;
  };
  headshot: {
    href: string;
  };
  college?: {
    name: string;
  };
  birthPlace: {
    city: string;
    state?: string;
    country: string;
  };
  status: {
    id: string;
    name: string;
  };
  injuries?: Array<{
    status: string;
    date: string;
  }>;
}

export type { BookmakerOdds, GameOdds, OddsData };