import { useNBAEvents } from '@/hooks/useNBAEvents';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Loader2, AlertCircle } from 'lucide-react';

export function UpcomingGames() {
  const { data: games, isLoading, error } = useNBAEvents('upcoming');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] text-destructive">
        <AlertCircle className="h-6 w-6 mr-2" />
        <span>Failed to load upcoming games</span>
        <pre className="mt-2 text-xs">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  if (!games?.length) {
    return (
      <div className="text-center text-muted-foreground p-8">
        <p>No upcoming games scheduled</p>
        <p className="text-sm mt-2">Check back later for new games</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="grid gap-4">
        {games.map((game) => (
          <Card 
            key={game.id} 
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="font-mono">
                  {format(new Date(game.startTime), 'MMM d, h:mm a')}
                </Badge>
                <Badge variant="secondary" className="font-mono">
                  O/U {game.markets.total.line}
                </Badge>
              </div>

              <div className="space-y-4">
                {/* Home Team */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{game.homeTeam.name}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="font-mono">
                        {game.markets.spread.home > 0 ? '+' : ''}
                        {game.markets.spread.home}
                      </Badge>
                      <Badge 
                        variant={game.markets.moneyline.home > 0 ? 'secondary' : 'default'}
                        className="font-mono"
                      >
                        {game.markets.moneyline.home > 0 ? '+' : ''}
                        {game.markets.moneyline.home}
                      </Badge>
                    </div>
                  </div>
                  {game.homeTeam.score !== undefined && (
                    <div className="text-2xl font-bold">{game.homeTeam.score}</div>
                  )}
                </div>

                {/* Away Team */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{game.awayTeam.name}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="font-mono">
                        {game.markets.spread.away > 0 ? '+' : ''}
                        {game.markets.spread.away}
                      </Badge>
                      <Badge 
                        variant={game.markets.moneyline.away > 0 ? 'secondary' : 'default'}
                        className="font-mono"
                      >
                        {game.markets.moneyline.away > 0 ? '+' : ''}
                        {game.markets.moneyline.away}
                      </Badge>
                    </div>
                  </div>
                  {game.awayTeam.score !== undefined && (
                    <div className="text-2xl font-bold">{game.awayTeam.score}</div>
                  )}
                </div>

                {/* Market Info */}
                <div className="pt-2 border-t mt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Spread Odds</p>
                      <div className="flex gap-2">
                        <span className="font-mono">H: {game.markets.spread.homeOdds}</span>
                        <span className="font-mono">A: {game.markets.spread.awayOdds}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Odds</p>
                      <div className="flex gap-2">
                        <span className="font-mono">O: {game.markets.total.over}</span>
                        <span className="font-mono">U: {game.markets.total.under}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}