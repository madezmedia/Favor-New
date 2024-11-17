import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLineMovements } from '@/hooks/useOdds';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { format } from 'date-fns';

export function OddsMovement() {
  const { data: movements } = useLineMovements('latest');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Movement</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {movements?.map((movement, index) => (
              <div
                key={`${movement.gameId}-${index}`}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div>
                  <div className="font-medium">{movement.bookmaker}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(movement.timestamp), 'MMM d, h:mm a')}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">{movement.odds}</div>
                    <div className="text-sm text-muted-foreground">
                      {movement.market}
                    </div>
                  </div>

                  <Badge
                    variant={
                      movement.movement === 'up'
                        ? 'default'
                        : movement.movement === 'down'
                        ? 'destructive'
                        : 'secondary'
                    }
                    className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                  >
                    {movement.movement === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : movement.movement === 'down' ? (
                      <TrendingDown className="h-4 w-4" />
                    ) : (
                      <Minus className="h-4 w-4" />
                    )}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}