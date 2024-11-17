import { relations } from 'drizzle-orm';
import { 
  sqliteTable, 
  text, 
  integer, 
  real 
} from 'drizzle-orm/sqlite-core';

// Teams table
export const teams = sqliteTable('teams', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  abbreviation: text('abbreviation').notNull(),
  location: text('location').notNull(),
  conference: text('conference').notNull(),
  division: text('division').notNull(),
  color: text('color'),
  alternateColor: text('alternate_color'),
  logo: text('logo').notNull(),
  nbaApiId: text('nba_api_id').notNull(),
  oddsApiId: text('odds_api_id').notNull(),
  rapidApiId: text('rapid_api_id').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Players table
export const players = sqliteTable('players', {
  id: text('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  fullName: text('full_name').notNull(),
  position: text('position').notNull(),
  number: text('number').notNull(),
  height: integer('height').notNull(),
  weight: integer('weight').notNull(),
  birthDate: text('birth_date').notNull(),
  teamId: text('team_id')
    .notNull()
    .references(() => teams.id),
  status: text('status', { enum: ['ACTIVE', 'INJURED', 'INACTIVE'] }).notNull(),
  nbaApiId: text('nba_api_id').notNull(),
  oddsApiId: text('odds_api_id').notNull(),
  rapidApiId: text('rapid_api_id').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Games table
export const games = sqliteTable('games', {
  id: text('id').primaryKey(),
  startTime: text('start_time').notNull(),
  status: text('status', { 
    enum: ['SCHEDULED', 'LIVE', 'FINISHED', 'POSTPONED'] 
  }).notNull(),
  homeTeamId: text('home_team_id')
    .notNull()
    .references(() => teams.id),
  awayTeamId: text('away_team_id')
    .notNull()
    .references(() => teams.id),
  season: text('season').notNull(),
  gameType: text('game_type', {
    enum: ['REGULAR', 'PLAYOFF', 'PRESEASON']
  }).notNull(),
  nbaApiId: text('nba_api_id').notNull(),
  oddsApiId: text('odds_api_id').notNull(),
  rapidApiId: text('rapid_api_id').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Odds table
export const odds = sqliteTable('odds', {
  id: text('id').primaryKey(),
  gameId: text('game_id')
    .notNull()
    .references(() => games.id),
  bookmaker: text('bookmaker').notNull(),
  market: text('market', {
    enum: ['MONEYLINE', 'SPREAD', 'TOTAL', 'PLAYER_PROP']
  }).notNull(),
  homeOdds: real('home_odds').notNull(),
  awayOdds: real('away_odds').notNull(),
  line: real('line'),
  probability: real('probability').notNull(),
  timestamp: text('timestamp').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Bets table
export const bets = sqliteTable('bets', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  gameId: text('game_id')
    .notNull()
    .references(() => games.id),
  betType: text('bet_type', {
    enum: ['MONEYLINE', 'SPREAD', 'TOTAL', 'PLAYER_PROP', 'PARLAY']
  }).notNull(),
  stake: real('stake').notNull(),
  odds: real('odds').notNull(),
  status: text('status', {
    enum: ['PENDING', 'WON', 'LOST', 'VOID', 'CASHOUT']
  }).notNull(),
  result: text('result', {
    enum: ['WIN', 'LOSS', 'PUSH', 'VOID']
  }),
  profit: real('profit'),
  settledAt: text('settled_at'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Relations
export const teamsRelations = relations(teams, ({ many }) => ({
  players: many(players),
  homeGames: many(games, { relationName: 'homeTeam' }),
  awayGames: many(games, { relationName: 'awayTeam' }),
}));

export const playersRelations = relations(players, ({ one }) => ({
  team: one(teams, {
    fields: [players.teamId],
    references: [teams.id],
  }),
}));

export const gamesRelations = relations(games, ({ one, many }) => ({
  homeTeam: one(teams, {
    fields: [games.homeTeamId],
    references: [teams.id],
  }),
  awayTeam: one(teams, {
    fields: [games.awayTeamId],
    references: [teams.id],
  }),
  odds: many(odds),
  bets: many(bets),
}));

export const oddsRelations = relations(odds, ({ one }) => ({
  game: one(games, {
    fields: [odds.gameId],
    references: [games.id],
  }),
}));

export const betsRelations = relations(bets, ({ one }) => ({
  game: one(games, {
    fields: [bets.gameId],
    references: [games.id],
  }),
}));