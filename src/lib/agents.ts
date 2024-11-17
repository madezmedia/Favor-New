import { Task, Crew, Process } from 'crewai';

// Agent types
export interface Agent {
  id: string;
  name: string;
  role: string;
  goal: string;
  backstory: string;
}

// Create agents
export const createDataAnalyst = () => ({
  id: 'data-analyst',
  name: 'Data Analyst',
  role: 'Data Analyst',
  goal: 'Analyze sports data and betting trends with high accuracy',
  backstory: 'Expert in sports analytics with deep knowledge of statistical analysis',
});

export const createResearchAnalyst = () => ({
  id: 'research-analyst',
  name: 'Research Analyst',
  role: 'Research Analyst',
  goal: 'Gather and verify latest sports information and news',
  backstory: 'Specialized in sports research and information verification',
});

export const createBettingSpecialist = () => ({
  id: 'betting-specialist',
  name: 'Betting Specialist',
  role: 'Sports Betting Specialist',
  goal: 'Provide detailed betting analysis and recommendations',
  backstory: 'Expert in sports betting markets with years of experience in odds analysis',
});

// Create tasks for each agent
export const createTasks = (agents: Agent[], data: any) => {
  const tasks = [
    new Task({
      description: `Research latest news, injuries, and trends for the teams`,
      agent: agents.find(a => a.id === 'research-analyst'),
      context: data,
    }),
    new Task({
      description: `Analyze historical data and current statistics`,
      agent: agents.find(a => a.id === 'data-analyst'),
      context: data,
    }),
    new Task({
      description: `Provide betting recommendations based on analysis`,
      agent: agents.find(a => a.id === 'betting-specialist'),
      context: data,
    }),
  ];

  return tasks;
};

// Create crew with agents and tasks
export const createCrew = (agents: Agent[], tasks: Task[]) => {
  return new Crew({
    agents,
    tasks,
    process: Process.sequential,
  });
};

// Run analysis with crew
export const runAnalysis = async (data: any) => {
  const agents = [
    createDataAnalyst(),
    createResearchAnalyst(),
    createBettingSpecialist(),
  ];

  const tasks = createTasks(agents, data);
  const crew = createCrew(agents, tasks);

  return await crew.kickoff();
};