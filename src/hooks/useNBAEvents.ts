import { useQuery } from '@tanstack/react-query';
import { fetchNBAEvents, transformEventData } from '@/lib/api-client';

export function useNBAEvents(type: 'live' | 'upcoming' = 'live') {
  return useQuery({
    queryKey: ['nba-events', type],
    queryFn: async () => {
      const response = await fetchNBAEvents(type);
      return response.data.map(transformEventData);
    },
    staleTime: type === 'live' ? 15 * 1000 : 60 * 1000, // 15s for live, 60s for upcoming
    refetchInterval: type === 'live' ? 15 * 1000 : 60 * 1000,
  });
}