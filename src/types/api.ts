// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T[];
  nextCursor?: string;
}

export interface ApiEvent {
  eventID: string;
  sportID: string;
  leagueID: string;
  type: 'match' | 'prop';
  status: {
    startsAt: string;
    oddsOverview: string;
    displayShort: string;
    displayLong: string;
    periods: {
      started: string[];
      ended: string[];
    };
    oddsFinalizeAt?: string;
  };
  teams: {
    away: ApiTeam;
    home: ApiTeam;
  };
  odds: {
    [key: string]: ApiOdds;
  };
  results?: {
    [period: string]: {
      [entityId: string]: {
        [statId: string]: number;
      };
    };
  };
}

export interface ApiTeam {
  teamID: string;
  names: {
    short: string;
    medium: string;
    long: string;
  };
  score?: number;
  colors?: {
    primary: string;
    primaryContrast: string;
  };
}

export interface ApiOdds {
  oddID: string;
  periodID: string;
  sideID: string;
  statID: string;
  betTypeID: string;
  odds: string;
  score?: number;
  overUnder?: string;
  bookOverUnder?: string;
  closeOdds?: string;
  closeOverUnder?: string;
  bookOdds?: string;
}</content>