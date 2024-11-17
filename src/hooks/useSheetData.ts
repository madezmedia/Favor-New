import { useQuery } from '@tanstack/react-query';
import { fetchOddsData } from '@/lib/sheets';

export function useSheetOdds() {
  return useQuery({
    queryKey: ['sheetOdds'],
    queryFn: fetchOddsData,
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
    staleTime: 1000 * 60 * 1, // Consider data stale after 1 minute
  });
}