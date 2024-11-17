import { useQuery } from '@tanstack/react-query';
import { fetchTeams, fetchTeamDetails, fetchTeamPlayers, getAIAnalysis } from '@/lib/api';

export function useNBATeams() {
  return useQuery({
    queryKey: ['nbaTeams'],
    queryFn: fetchTeams,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useTeamDetails(teamId: string) {
  return useQuery({
    queryKey: ['team', teamId],
    queryFn: () => fetchTeamDetails(teamId),
    enabled: !!teamId,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

export function useTeamPlayers(teamId: string) {
  return useQuery({
    queryKey: ['teamPlayers', teamId],
    queryFn: () => fetchTeamPlayers(teamId),
    enabled: !!teamId,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

export function useAIAnalysis(prompt: string) {
  return useQuery({
    queryKey: ['aiAnalysis', prompt],
    queryFn: () => getAIAnalysis(prompt),
    enabled: !!prompt,
    staleTime: 1000 * 60 * 30, // 30 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
}