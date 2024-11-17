import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLiveOdds } from '@/hooks/useOdds';
import { BarChart, TrendingUp, TrendingDown } from 'lucide-react';

export function StatsOverview() {
  const { data: liveGames } = useLiveOdds();

  // Calculate market statistics
  const stats = liveGames?.reduce((acc, game) => {
    acc.totalGames++;
    acc.avgSpread += Math.abs(game.markets.spread.home);
    acc.avgTotal += game.markets.total.line;
    acc.avgOdds += Math.abs(game.markets.moneyline.home);
    
    // Track line movements
    const spreadMovement = game.markets.spread.homeOdds > -110 ? 'up' : 'down';
    acc.movements[spreadMovement]++;
    
    return acc;
  }, { 
    totalGames: 0, 
    avgSpread: 0, 
    avgTotal: 0, 
    avgOdds: 0,
    movements: { up: 0, down: 0 }
  }) || { 
    totalGames: 0, 
    avgSpread: 0, 
    avgTotal: 0, 
    avgOdds: 0,
    movements: { up: 0, down: 0 }
  };

  if (stats.totalGames > 0) {
    stats.avgSpread = +(stats.avgSpread / stats.totalGames).toFixed(1);
    stats.avgTotal = +(stats.avgTotal / stats.totalGames).toFixed(1);
    stats.avgOdds = +(stats.avgOdds / stats.totalGames).toFixed(0);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Market Overview
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {stats.movements.up}
            </Badge>
            <Badge variant="destructive" className="flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              {stats.movements.down}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Average Spread</p>
              <Badge variant="secondary" className="font-mono">
                {stats.avgSpread}
              </Badge>
            </div>
            <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(stats.avgSpread / 15) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Average Total</p>
              <Badge variant="secondary" className="font-mono">
                {stats.avgTotal}
              </Badge>
            </div>
            <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(stats.avgTotal / 250) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Average ML Odds</p>
              <Badge variant="secondary" className="font-mono">
                {stats.avgOdds > 0 ? '+' : ''}{stats.avgOdds}
              </Badge>
            </div>
            <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(Math.abs(stats.avgOdds) / 300) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}