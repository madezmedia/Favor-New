import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAgents } from '@/hooks/useAgents';
import { Brain, Target, TrendingUp, History, Play, Pause, RefreshCw } from 'lucide-react';
import { AgentCard } from '@/components/agents/agent-card';
import { AgentAnalysis } from '@/components/agents/agent-analysis';
import { useState } from 'react';

const AGENTS = [
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    icon: TrendingUp,
    description: 'Analyzes sports data and betting trends with high accuracy',
    backstory: 'Expert in sports analytics with deep knowledge of statistical analysis',
    status: 'idle',
  },
  {
    id: 'research-analyst',
    name: 'Research Analyst',
    icon: History,
    description: 'Gathers and verifies latest sports information and news',
    backstory: 'Specialized in sports research and information verification',
    status: 'idle',
  },
  {
    id: 'betting-specialist',
    icon: Target,
    name: 'Betting Specialist',
    description: 'Provides detailed betting analysis and recommendations',
    backstory: 'Expert in sports betting markets with years of experience in odds analysis',
    status: 'idle',
  },
];

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const { startAgent, stopAgent, agentStates, latestAnalysis } = useAgents();

  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="space-y-8 pb-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">AI Agents</h2>
            <p className="text-muted-foreground">
              Manage and monitor your AI betting analysts
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => AGENTS.forEach(agent => startAgent(agent.id))}
            >
              <Play className="h-4 w-4" />
              Start All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => AGENTS.forEach(agent => stopAgent(agent.id))}
            >
              <Pause className="h-4 w-4" />
              Stop All
            </Button>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {AGENTS.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              status={agentStates[agent.id]}
              onStart={() => startAgent(agent.id)}
              onStop={() => stopAgent(agent.id)}
              onSelect={() => setSelectedAgent(agent.id)}
              selected={selectedAgent === agent.id}
            />
          ))}
        </div>

        {/* Analysis Section */}
        {selectedAgent && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Latest Analysis
              </CardTitle>
              <Badge variant="outline" className="font-mono">
                <RefreshCw className="h-3 w-3 mr-1" />
                Updated {latestAnalysis?.timestamp}
              </Badge>
            </CardHeader>
            <CardContent>
              <AgentAnalysis agentId={selectedAgent} />
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}