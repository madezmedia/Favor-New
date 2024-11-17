import { useQuery } from '@tanstack/react-query';
import { fetchTeamLogo } from '@/lib/api';

export function useTeamLogo(teamId: string) {
  return useQuery({
    queryKey: ['teamLogo', teamId],
    queryFn: () => fetchTeamLogo(teamId),
    staleTime: 1000 * 60 * 60, // Consider fresh for 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
    retry: 2,
  });
}