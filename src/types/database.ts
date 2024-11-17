import { z } from 'zod';

// Base schemas for shared properties
export const BaseEntitySchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Team schemas
export const TeamSchema = BaseEntitySchema.extend({
  name: z.string(),
  abbreviation: z.string(),
  location: z.string(),
  conference: z.string(),
  division: z.string(),
  color: z.string().optional(),
  alternateColor: z.string().optional(),
  logo: z.string().url(),
  externalIds: z.object({
    nbaApi: z.string(),
    oddsApi: z.string(),
    rapidApi: z.string(),
  }),
});

// Player schemas
export const PlayerSchema = BaseEntitySchema.extend({
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  position: z.string(),
  number: z.string(),
  height: z.number(),
  weight: z.number(),
  birthDate: z.string().datetime(),
  teamId: z.string(),
  status: z.enum(['ACTIVE', 'INJURED', 'INACTIVE']),
  externalIds: z.object({
    nbaApi: z.string(),
    oddsApi: z.string(),
    rapidApi: z.string(),
  }),
});

// Game schemas
export const GameSchema = BaseEntitySchema.extend({
  startTime: z.string().datetime(),
  status: z.enum(['SCHEDULED', 'LIVE', 'FINISHED', 'POSTPONED']),
  homeTeamId: z.string(),
  awayTeamId: z.string(),
  season: z.string(),
  gameType: z.enum(['REGULAR', 'PLAYOFF', 'PRESEASON']),
  externalIds: z.object({
    nbaApi: z.string(),
    oddsApi: z.string(),
    rapidApi: z.string(),
  }),
});

// Odds schemas
export const OddsSchema = BaseEntitySchema.extend({
  gameId: z.string(),
  bookmaker: z.string(),
  market: z.enum(['MONEYLINE', 'SPREAD', 'TOTAL', 'PLAYER_PROP']),
  homeOdds: z.number(),
  awayOdds: z.number(),
  line: z.number().optional(),
  probability: z.number(),
  timestamp: z.string().datetime(),
});

// Bet schemas
export const BetSchema = BaseEntitySchema.extend({
  userId: z.string(),
  gameId: z.string(),
  betType: z.enum(['MONEYLINE', 'SPREAD', 'TOTAL', 'PLAYER_PROP', 'PARLAY']),
  stake: z.number(),
  odds: z.number(),
  status: z.enum(['PENDING', 'WON', 'LOST', 'VOID', 'CASHOUT']),
  result: z.enum(['WIN', 'LOSS', 'PUSH', 'VOID']).optional(),
  profit: z.number().optional(),
  settledAt: z.string().datetime().optional(),
});

// Type definitions
export type Team = z.infer<typeof TeamSchema>;
export type Player = z.infer<typeof PlayerSchema>;
export type Game = z.infer<typeof GameSchema>;
export type Odds = z.infer<typeof OddsSchema>;
export type Bet = z.infer<typeof BetSchema>;