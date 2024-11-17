CREATE TABLE `teams` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `abbreviation` text NOT NULL,
  `location` text NOT NULL,
  `conference` text NOT NULL,
  `division` text NOT NULL,
  `color` text,
  `alternate_color` text,
  `logo` text NOT NULL,
  `nba_api_id` text NOT NULL,
  `odds_api_id` text NOT NULL,
  `rapid_api_id` text NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL
);

CREATE TABLE `players` (
  `id` text PRIMARY KEY NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `full_name` text NOT NULL,
  `position` text NOT NULL,
  `number` text NOT NULL,
  `height` integer NOT NULL,
  `weight` integer NOT NULL,
  `birth_date` text NOT NULL,
  `team_id` text NOT NULL,
  `status` text NOT NULL,
  `nba_api_id` text NOT NULL,
  `odds_api_id` text NOT NULL,
  `rapid_api_id` text NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL,
  FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`)
);

CREATE TABLE `games` (
  `id` text PRIMARY KEY NOT NULL,
  `start_time` text NOT NULL,
  `status` text NOT NULL,
  `home_team_id` text NOT NULL,
  `away_team_id` text NOT NULL,
  `season` text NOT NULL,
  `game_type` text NOT NULL,
  `nba_api_id` text NOT NULL,
  `odds_api_id` text NOT NULL,
  `rapid_api_id` text NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL,
  FOREIGN KEY (`home_team_id`) REFERENCES `teams` (`id`),
  FOREIGN KEY (`away_team_id`) REFERENCES `teams` (`id`)
);

CREATE TABLE `odds` (
  `id` text PRIMARY KEY NOT NULL,
  `game_id` text NOT NULL,
  `bookmaker` text NOT NULL,
  `market` text NOT NULL,
  `home_odds` real NOT NULL,
  `away_odds` real NOT NULL,
  `line` real,
  `probability` real NOT NULL,
  `timestamp` text NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL,
  FOREIGN KEY (`game_id`) REFERENCES `games` (`id`)
);

CREATE TABLE `bets` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `game_id` text NOT NULL,
  `bet_type` text NOT NULL,
  `stake` real NOT NULL,
  `odds` real NOT NULL,
  `status` text NOT NULL,
  `result` text,
  `profit` real,
  `settled_at` text,
  `created_at` text NOT NULL,
  `updated_at` text NOT NULL,
  FOREIGN KEY (`game_id`) REFERENCES `games` (`id`)
);

CREATE INDEX `idx_teams_external_ids` ON `teams` (`nba_api_id`, `odds_api_id`, `rapid_api_id`);
CREATE INDEX `idx_players_team` ON `players` (`team_id`);
CREATE INDEX `idx_players_external_ids` ON `players` (`nba_api_id`, `odds_api_id`, `rapid_api_id`);
CREATE INDEX `idx_games_teams` ON `games` (`home_team_id`, `away_team_id`);
CREATE INDEX `idx_games_external_ids` ON `games` (`nba_api_id`, `odds_api_id`, `rapid_api_id`);
CREATE INDEX `idx_odds_game` ON `odds` (`game_id`);
CREATE INDEX `idx_bets_game` ON `bets` (`game_id`);
CREATE INDEX `idx_bets_user` ON `bets` (`user_id`);