import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type AgentStatus = 'idle' | 'running' | 'stopped';

interface AgentState {
  [agentId: string]: AgentStatus;
}

interface Analysis {
  type: string;
  analysis: string;
  confidence: number;
  trend: 'up' | 'down';
  recommendations?: string[];
  timestamp: string;
}

export function useAgents() {
  const [agentStates, setAgentStates] = useState<AgentState>({});
  const queryClient = useQueryClient();

  const startAgent = (agentId: string) => {
    setAgentStates(prev => ({
      ...prev,
      [agentId]: 'running'
    }));
  };

  const stopAgent = (agentId: string) => {
    setAgentStates(prev => ({
      ...prev,
      [agentId]: 'stopped'
    }));
  };

  const { data: latestAnalysis } = useQuery({
    queryKey: ['latestAnalysis'],
    queryFn: async () => {
      // Fetch latest analysis from your API
      return {
        timestamp: new Date().toLocaleTimeString(),
        analysis: 'Sample analysis...'
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  return {
    agentStates,
    startAgent,
    stopAgent,
    latestAnalysis,
  };
}

export function useAgentAnalysis(agentId: string) {
  return useQuery({
    queryKey: ['agentAnalysis', agentId],
    queryFn: async (): Promise<Analysis[]> => {
      // This would be replaced with your actual API call
      return [
        {
          type: 'trend-analysis',
          analysis: 'Strong betting trend detected for Lakers vs Warriors game.',
          confidence: 0.85,
          trend: 'up',
          recommendations: [
            'Consider Lakers -3.5 spread',
            'Monitor line movement for better value',
          ],
          timestamp: new Date().toISOString(),
        },
        {
          type: 'market-analysis',
          analysis: 'Public heavily favoring the over, but sharp money on under.',
          confidence: 0.75,
          trend: 'down',
          recommendations: [
            'Look for value on the under',
            'Wait for line to move up before placing bet',
          ],
          timestamp: new Date().toISOString(),
        },
      ];
    },
    enabled: !!agentId,
  });
}