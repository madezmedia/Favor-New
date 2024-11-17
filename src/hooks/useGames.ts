import { useQuery } from '@tanstack/react-query';
import { fetchTodaysGames } from '@/lib/data';

export function useGames() {
  return useQuery({
    queryKey: ['games', 'today'],
    queryFn: fetchTodaysGames,
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });
}