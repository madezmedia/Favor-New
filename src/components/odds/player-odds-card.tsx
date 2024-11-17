import { PlayerMarketOdds, MarketType } from '@/types/odds';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PlayerOddsCardProps {
  playerName: string;
  odds: PlayerMarketOdds;
}

const MARKET_COLORS: Record<MarketType, string> = {
  'Points': 'bg-red-500/10 text-red-500',
  'Assists': 'bg-blue-500/10 text-blue-500',
  'Rebounds': 'bg-green-500/10 text-green-500',
  'Blocks': 'bg-purple-500/10 text-purple-500',
  'Steals': 'bg-yellow-500/10 text-yellow-500',
  'Three Points Made': 'bg-orange-500/10 text-orange-500',
};

export function PlayerOddsCard({ playerName, odds }: PlayerOddsCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{playerName}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {Object.entries(odds).map(([market, marketOdds]) => (
              <div key={market} className="space-y-2">
                <Badge 
                  variant="outline" 
                  className={MARKET_COLORS[market as MarketType]}
                >
                  {market}
                </Badge>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>Over</span>
                    </div>
                    {marketOdds.over.map((book) => (
                      <div 
                        key={book.id}
                        className="flex justify-between items-center text-sm"
                      >
                        <span>{book.bookie}</span>
                        <div className="space-x-2">
                          <span>{book.line.line}</span>
                          <Badge variant="outline">
                            {book.line.cost.toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <TrendingDown className="h-4 w-4" />
                      <span>Under</span>
                    </div>
                    {marketOdds.under.map((book) => (
                      <div 
                        key={book.id}
                        className="flex justify-between items-center text-sm"
                      >
                        <span>{book.bookie}</span>
                        <div className="space-x-2">
                          <span>{book.line.line}</span>
                          <Badge variant="outline">
                            {book.line.cost.toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}