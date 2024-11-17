import { useQuery } from '@tanstack/react-query';
import { fetchLiveEvents, fetchEventOdds, fetchLineMovements, fetchPlayerProps } from '@/lib/sports-odds-api';
import type { BookmakerOdds, GameOdds, OddsData } from '@/types/odds';

const STALE_TIMES = {
  LIVE: 15 * 1000,
  UPCOMING: 60 * 1000,
  ODDS: 30 * 1000,
  MOVEMENTS: 60 * 1000,
  PROPS: 60 * 1000,
};

const CACHE_TIMES = {
  LIVE: 30 * 1000,
  UPCOMING: 5 * 60 * 1000,
  ODDS: 2 * 60 * 1000,
  MOVEMENTS: 5 * 60 * 1000,
  PROPS: 5 * 60 * 1000,
};

export function useLiveOdds() {
  return useQuery<GameOdds[]>({
    queryKey: ['liveOdds'],
    queryFn: () => fetchLiveEvents('live'),
    staleTime: STALE_TIMES.LIVE,
    cacheTime: CACHE_TIMES.LIVE,
    refetchInterval: STALE_TIMES.LIVE,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useUpcomingGames() {
  return useQuery<GameOdds[]>({
    queryKey: ['upcomingGames'],
    queryFn: () => fetchLiveEvents('upcoming'),
    staleTime: STALE_TIMES.UPCOMING,
    cacheTime: CACHE_TIMES.UPCOMING,
    refetchInterval: STALE_TIMES.UPCOMING,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useOddsComparison(gameId: string) {
  return useQuery<BookmakerOdds[]>({
    queryKey: ['oddsComparison', gameId],
    queryFn: () => fetchEventOdds(gameId),
    enabled: !!gameId,
    staleTime: STALE_TIMES.ODDS,
    cacheTime: CACHE_TIMES.ODDS,
    refetchInterval: STALE_TIMES.ODDS,
  });
}

export function useLineMovements(eventId: string) {
  return useQuery<OddsData[]>({
    queryKey: ['lineMovements', eventId],
    queryFn: () => fetchLineMovements(eventId),
    enabled: !!eventId,
    staleTime: STALE_TIMES.MOVEMENTS,
    cacheTime: CACHE_TIMES.MOVEMENTS,
    refetchInterval: STALE_TIMES.MOVEMENTS,
  });
}

export function usePlayerProps(eventId: string) {
  return useQuery({
    queryKey: ['playerProps', eventId],
    queryFn: () => fetchPlayerProps(eventId),
    enabled: !!eventId,
    staleTime: STALE_TIMES.PROPS,
    cacheTime: CACHE_TIMES.PROPS,
    refetchInterval: STALE_TIMES.PROPS,
  });
}