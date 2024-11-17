import { useLiveOdds, useUpcomingGames } from '@/hooks/useOdds';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Clock, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { OddsComparison } from '@/components/odds/odds-comparison';
import { LineMovements } from '@/components/odds/line-movements';

export function GamesOverview() {
  const { 
    data: liveGames, 
    isLoading: isLoadingLive, 
    error: liveError 
  } = useLiveOdds();
  
  const { 
    data: upcomingGames, 
    isLoading: isLoadingUpcoming, 
    error: upcomingError 
  } = useUpcomingGames();

  if (isLoadingLive || isLoadingUpcoming) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const error = liveError || upcomingError;
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to load games'}
          {process.env.NODE_ENV === 'development' && error instanceof Error && (
            <div className="mt-2 text-xs opacity-50">
              {error.stack}
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  const hasGames = (liveGames?.length || 0) + (upcomingGames?.length || 0) > 0;
  if (!hasGames) {
    return (
      <Alert>
        <AlertDescription>
          No NBA games scheduled at the moment. Check back later for upcoming games.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Live Games */}
      {liveGames?.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Live Games
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="grid gap-4">
                {liveGames.map((game) => (
                  <div
                    key={game.id}
                    className="p-4 rounded-lg border bg-card/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="font-mono">
                        LIVE
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">
                          {format(new Date(game.startTime), 'h:mm a')}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Home Team */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="font-semibold">{game.homeTeam.name}</div>
                          <Badge variant="outline">
                            {game.markets.spread.home}
                          </Badge>
                        </div>
                        <div className="font-mono">
                          {game.homeTeam.score || 0}
                        </div>
                      </div>

                      {/* Away Team */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="font-semibold">{game.awayTeam.name}</div>
                          <Badge variant="outline">
                            {game.markets.spread.away}
                          </Badge>
                        </div>
                        <div className="font-mono">
                          {game.awayTeam.score || 0}
                        </div>
                      </div>

                      {/* Odds */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                        <div>O/U {game.markets.total.line}</div>
                        <div>ML {game.markets.moneyline.home}</div>
                      </div>
                    </div>

                    {/* Odds Comparison */}
                    <div className="mt-4">
                      <OddsComparison gameId={game.id} />
                    </div>

                    {/* Line Movements */}
                    <div className="mt-4">
                      <LineMovements gameId={game.id} />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Games */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming Games
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="grid gap-4">
              {upcomingGames?.map((game) => (
                <div
                  key={game.id}
                  className="p-4 rounded-lg border bg-card/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">
                      {format(new Date(game.startTime), 'MMM d')}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        {format(new Date(game.startTime), 'h:mm a')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Home Team */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="font-semibold">{game.homeTeam.name}</div>
                        <Badge variant="outline">
                          {game.markets.spread.home}
                        </Badge>
                      </div>
                      <div className="font-mono">
                        {game.markets.moneyline.home}
                      </div>
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="font-semibold">{game.awayTeam.name}</div>
                        <Badge variant="outline">
                          {game.markets.spread.away}
                        </Badge>
                      </div>
                      <div className="font-mono">
                        {game.markets.moneyline.away}
                      </div>
                    </div>

                    {/* Odds */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                      <div>Total {game.markets.total.line}</div>
                      <div>
                        O {game.markets.total.over} | U {game.markets.total.under}
                      </div>
                    </div>
                  </div>

                  {/* Odds Comparison */}
                  <div className="mt-4">
                    <OddsComparison gameId={game.id} />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}