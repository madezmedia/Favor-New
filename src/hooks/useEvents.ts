import { useQuery } from '@tanstack/react-query';
import { fetchDailyEvents } from '@/lib/api';

export function useDailyEvents() {
  return useQuery({
    queryKey: ['dailyEvents'],
    queryFn: fetchDailyEvents,
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
    staleTime: 1000 * 60 * 1, // Consider data stale after 1 minute
    cacheTime: 1000 * 60 * 30, // Cache for 30 minutes
    retry: 3,
  });
}