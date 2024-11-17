-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create teams table
create table teams (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  abbreviation text not null unique,
  location text not null,
  conference text not null,
  division text not null,
  color text,
  alternate_color text,
  logo text not null,
  nba_api_id text not null unique,
  odds_api_id text not null unique,
  rapid_api_id text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create players table
create table players (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text not null,
  full_name text not null,
  position text not null,
  number text not null,
  height integer not null,
  weight integer not null,
  birth_date date not null,
  team_id uuid references teams(id) not null,
  status text not null check (status in ('ACTIVE', 'INJURED', 'INACTIVE')),
  nba_api_id text not null unique,
  odds_api_id text not null unique,
  rapid_api_id text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create games table
create table games (
  id uuid primary key default uuid_generate_v4(),
  start_time timestamp with time zone not null,
  status text not null check (status in ('SCHEDULED', 'LIVE', 'FINISHED', 'POSTPONED')),
  home_team_id uuid references teams(id) not null,
  away_team_id uuid references teams(id) not null,
  season text not null,
  game_type text not null check (game_type in ('REGULAR', 'PLAYOFF', 'PRESEASON')),
  nba_api_id text not null unique,
  odds_api_id text not null unique,
  rapid_api_id text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create odds table
create table odds (
  id uuid primary key default uuid_generate_v4(),
  game_id uuid references games(id) not null,
  bookmaker text not null,
  market text not null check (market in ('MONEYLINE', 'SPREAD', 'TOTAL', 'PLAYER_PROP')),
  home_odds numeric not null,
  away_odds numeric not null,
  line numeric,
  probability numeric not null,
  timestamp timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create bets table
create table bets (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,
  game_id uuid references games(id) not null,
  bet_type text not null check (bet_type in ('MONEYLINE', 'SPREAD', 'TOTAL', 'PLAYER_PROP', 'PARLAY')),
  stake numeric not null,
  odds numeric not null,
  status text not null check (status in ('PENDING', 'WON', 'LOST', 'VOID', 'CASHOUT')),
  result text check (result in ('WIN', 'LOSS', 'PUSH', 'VOID')),
  profit numeric,
  settled_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index idx_players_team on players(team_id);
create index idx_games_teams on games(home_team_id, away_team_id);
create index idx_odds_game on odds(game_id);
create index idx_bets_user_game on bets(user_id, game_id);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Add triggers for updated_at
create trigger update_teams_updated_at
  before update on teams
  for each row
  execute function update_updated_at_column();

create trigger update_players_updated_at
  before update on players
  for each row
  execute function update_updated_at_column();

create trigger update_games_updated_at
  before update on games
  for each row
  execute function update_updated_at_column();

create trigger update_odds_updated_at
  before update on odds
  for each row
  execute function update_updated_at_column();

create trigger update_bets_updated_at
  before update on bets
  for each row
  execute function update_updated_at_column();