import { useQuery } from '@tanstack/react-query';
import { fetchTeams } from '@/lib/api';

export function useNBATeams() {
  return useQuery({
    queryKey: ['nbaTeams'],
    queryFn: fetchTeams,
    staleTime: 1000 * 60 * 60, // Consider data fresh for 1 hour
  });
}