import { useQuery } from '@tanstack/react-query';
import { fetchSheetData, fetchBettingStats, BettingData } from '@/lib/google-sheets';

export function useSheetData() {
  return useQuery({
    queryKey: ['sheetData'],
    queryFn: fetchSheetData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useBettingStats() {
  return useQuery({
    queryKey: ['bettingStats'],
    queryFn: fetchBettingStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}