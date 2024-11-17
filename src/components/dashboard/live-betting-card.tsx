import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLiveOdds } from '@/hooks/useOdds';
import { Loader2, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function LiveBettingCard() {
  const { data: liveGames, isLoading } = useLiveOdds();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary animate-pulse" />
            Live Betting
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  const latestGame = liveGames?.[0];

  if (!latestGame) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Live Betting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No live games at the moment</p>
        </CardContent>
      </Card>
    );
  }

  const homeSpreadTrend = latestGame.markets.spread.homeOdds > -110 ? 'up' : 'down';
  const awaySpreadTrend = latestGame.markets.spread.awayOdds > -110 ? 'up' : 'down';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Live Betting
          </div>
          <Badge variant="secondary" className="font-mono">
            {formatDistanceToNow(new Date(latestGame.startTime), { addSuffix: true })}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{latestGame.homeTeam.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  ML: {latestGame.markets.moneyline.home > 0 ? '+' : ''}
                  {latestGame.markets.moneyline.home}
                </p>
                {homeSpreadTrend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-primary" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
              </div>
            </div>
            <div className="text-2xl font-bold">
              {latestGame.homeTeam.score || 0}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{latestGame.awayTeam.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  ML: {latestGame.markets.moneyline.away > 0 ? '+' : ''}
                  {latestGame.markets.moneyline.away}
                </p>
                {awaySpreadTrend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-primary" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
              </div>
            </div>
            <div className="text-2xl font-bold">
              {latestGame.awayTeam.score || 0}
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Spread</p>
                <p className="font-mono">
                  {latestGame.markets.spread.home > 0 ? '+' : ''}
                  {latestGame.markets.spread.home}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Total</p>
                <p className="font-mono">O/U {latestGame.markets.total.line}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}