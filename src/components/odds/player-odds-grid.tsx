import { usePlayerOdds } from '@/hooks/usePlayerOdds';
import { PlayerOddsCard } from './player-odds-card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface PlayerOddsGridProps {
  eventId: string;
}

export function PlayerOddsGrid({ eventId }: PlayerOddsGridProps) {
  const { data: playerOdds, isLoading, error } = usePlayerOdds(eventId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load player odds. Please try again later.
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-2 text-xs opacity-50">
              Error: {(error as Error).message}
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  if (!playerOdds || Object.keys(playerOdds).length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No odds available for this event yet. Check back closer to game time.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Object.entries(playerOdds).map(([playerName, odds]) => (
        <PlayerOddsCard
          key={playerName}
          playerName={playerName}
          odds={odds}
        />
      ))}
    </div>
  );
}