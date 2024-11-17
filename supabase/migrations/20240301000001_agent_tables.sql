-- Create agent_analysis table
create table agent_analysis (
  id uuid primary key default uuid_generate_v4(),
  agent_id text not null,
  analysis jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for faster lookups
create index idx_agent_analysis_agent on agent_analysis(agent_id);
create index idx_agent_analysis_created_at on agent_analysis(created_at);