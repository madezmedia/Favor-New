import { useOddsComparison } from '@/hooks/useOdds';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

interface OddsComparisonProps {
  gameId: string;
}

export function OddsComparison({ gameId }: OddsComparisonProps) {
  const { data: odds, isLoading } = useOddsComparison(gameId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!odds?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Odds Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {odds.map((bookmaker) => (
              <div
                key={bookmaker.bookmaker}
                className="p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">{bookmaker.bookmaker}</h4>
                  <Badge variant="outline">
                    Last updated: {new Date(bookmaker.lastUpdate).toLocaleTimeString()}
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {/* Moneyline */}
                  {bookmaker.markets.moneyline && (
                    <div>
                      <h5 className="text-sm font-medium mb-2">Moneyline</h5>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Home</span>
                          <span>{bookmaker.markets.moneyline.home}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Away</span>
                          <span>{bookmaker.markets.moneyline.away}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Spread */}
                  {bookmaker.markets.spread && (
                    <div>
                      <h5 className="text-sm font-medium mb-2">Spread</h5>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Home {bookmaker.markets.spread.home}</span>
                          <span>{bookmaker.markets.spread.homeOdds}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Away {bookmaker.markets.spread.away}</span>
                          <span>{bookmaker.markets.spread.awayOdds}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Totals */}
                  {bookmaker.markets.total && (
                    <div>
                      <h5 className="text-sm font-medium mb-2">Total {bookmaker.markets.total.line}</h5>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Over</span>
                          <span>{bookmaker.markets.total.over}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Under</span>
                          <span>{bookmaker.markets.total.under}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}