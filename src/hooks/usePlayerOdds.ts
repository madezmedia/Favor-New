import { useQuery } from '@tanstack/react-query';
import { fetchPlayerOdds } from '@/lib/api';
import { PlayerOdds, PlayerMarketOdds } from '@/types/odds';

function processPlayerOdds(odds: PlayerOdds[]): Record<string, PlayerMarketOdds> {
  const playerOdds: Record<string, PlayerMarketOdds> = {};

  odds.forEach((odd) => {
    const { player, market_label, selections } = odd;
    
    if (!playerOdds[player.name]) {
      playerOdds[player.name] = {};
    }

    if (!playerOdds[player.name][market_label]) {
      playerOdds[player.name][market_label] = {
        over: [],
        under: [],
      };
    }

    selections.forEach((selection) => {
      const target = selection.label.toLowerCase() === 'over' ? 'over' : 'under';
      playerOdds[player.name][market_label][target].push(...selection.books);
    });
  });

  return playerOdds;
}

export function usePlayerOdds(eventId: string) {
  return useQuery({
    queryKey: ['playerOdds', eventId],
    queryFn: () => fetchPlayerOdds(eventId),
    select: processPlayerOdds,
    staleTime: 1000 * 60 * 1, // Consider data stale after 1 minute
    cacheTime: 1000 * 60 * 5, // Keep in cache for 5 minutes
    refetchInterval: 1000 * 60 * 2, // Refetch every 2 minutes
    retry: 2,
    enabled: !!eventId,
  });
}