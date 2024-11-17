import { ProcessedGameOdds } from '@/types/odds';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface OddsDisplayProps {
  odds: ProcessedGameOdds;
}

export function OddsDisplay({ odds }: OddsDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {odds.home_team} vs {odds.away_team}
          </CardTitle>
          <Badge variant="outline">
            {format(new Date(odds.commence_time), 'MMM d, h:mm a')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Moneyline */}
          <div>
            <h3 className="text-sm font-medium mb-2">Moneyline</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span>{odds.home_team}</span>
                <span className="font-mono">
                  {odds.markets.h2h.home > 0 ? '+' : ''}{odds.markets.h2h.home}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{odds.away_team}</span>
                <span className="font-mono">
                  {odds.markets.h2h.away > 0 ? '+' : ''}{odds.markets.h2h.away}
                </span>
              </div>
            </div>
          </div>

          {/* Spread */}
          <div>
            <h3 className="text-sm font-medium mb-2">Spread</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span>{odds.home_team}</span>
                <div className="space-x-2">
                  <span>{odds.markets.spreads.home.point}</span>
                  <span className="font-mono">
                    {odds.markets.spreads.home.price > 0 ? '+' : ''}
                    {odds.markets.spreads.home.price}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span>{odds.away_team}</span>
                <div className="space-x-2">
                  <span>{odds.markets.spreads.away.point}</span>
                  <span className="font-mono">
                    {odds.markets.spreads.away.price > 0 ? '+' : ''}
                    {odds.markets.spreads.away.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div>
            <h3 className="text-sm font-medium mb-2">
              Total {odds.markets.totals.over.point}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span>Over</span>
                <span className="font-mono">
                  {odds.markets.totals.over.price > 0 ? '+' : ''}
                  {odds.markets.totals.over.price}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Under</span>
                <span className="font-mono">
                  {odds.markets.totals.under.price > 0 ? '+' : ''}
                  {odds.markets.totals.under.price}
                </span>
              </div>
            </div>
          </div>

          {/* Player Props */}
          {Object.entries(odds.markets.player_props).length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Player Props</h3>
              <div className="space-y-4">
                {Object.entries(odds.markets.player_props).map(([player, markets]) => (
                  <div key={player}>
                    <h4 className="text-sm font-medium mb-1">{player}</h4>
                    <div className="space-y-2">
                      {Object.entries(markets).map(([market, odds]) => (
                        <div key={market} className="grid grid-cols-2 gap-4">
                          <div className="flex justify-between">
                            <span>{market} Over {odds.over.point}</span>
                            <span className="font-mono">
                              {odds.over.price > 0 ? '+' : ''}{odds.over.price}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Under {odds.under.point}</span>
                            <span className="font-mono">
                              {odds.under.price > 0 ? '+' : ''}{odds.under.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}