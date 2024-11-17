import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUpcomingGames } from '@/hooks/useOdds';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

export function PopularBets() {
  const { data: games } = useUpcomingGames();

  const popularBets = games?.slice(0, 3).map(game => {
    const isHomeSpread = game.markets.spread.home > 0;
    const spreadOdds = isHomeSpread ? game.markets.spread.homeOdds : game.markets.spread.awayOdds;
    const spreadLine = Math.abs(game.markets.spread.home);
    
    // Calculate implied probability from odds
    const oddsNumber = Math.abs(spreadOdds);
    const impliedProb = spreadOdds > 0 
      ? (100 / (oddsNumber + 100)) * 100
      : (oddsNumber / (oddsNumber + 100)) * 100;

    return {
      type: 'Spread',
      team: isHomeSpread ? game.awayTeam.name : game.homeTeam.name,
      odds: spreadOdds,
      line: spreadLine,
      percentage: Math.round(impliedProb),
      value: impliedProb > 50 ? 'High' : 'Low',
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Popular Bets
          </div>
          <Badge variant="outline" className="font-mono">
            <DollarSign className="h-3 w-3 mr-1" />
            Value Picks
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularBets?.map((bet, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{bet.team}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      {bet.type} {bet.line > 0 ? '+' : ''}{bet.line}
                    </p>
                    <Badge 
                      variant={bet.value === 'High' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {bet.value} Value
                    </Badge>
                  </div>
                </div>
                <Badge className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {bet.percentage}%
                </Badge>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${bet.percentage}%`,
                    background: `linear-gradient(90deg, hsl(var(--primary)) ${bet.percentage}%, transparent ${bet.percentage}%)`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}