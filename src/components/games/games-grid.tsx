import { useGames } from '@/hooks/useGames';
import { GameCard } from './game-card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export function GamesGrid() {
  const { data: games, isLoading, error } = useGames();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load games. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!games?.length) {
    return (
      <Alert>
        <AlertDescription>
          No games scheduled for today.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}