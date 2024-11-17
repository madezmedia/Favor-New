import { Player } from '@/types/database';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  formatPlayerName, 
  formatPosition, 
  formatMeasurements,
  getPlayerHeadshot,
} from '@/lib/mappings/players';

interface PlayerCardProps {
  player: Player;
  className?: string;
}

export function PlayerCard({ player, className }: PlayerCardProps) {
  const headshots = getPlayerHeadshot(player);

  return (
    <Card className={cn("hover:shadow-lg transition-all", className)}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <img
              src={headshots.primary}
              alt={formatPlayerName(player)}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                // Try fallbacks in sequence
                const target = e.target as HTMLImageElement;
                if (target.src === headshots.primary) {
                  target.src = headshots.fallback1;
                } else if (target.src === headshots.fallback1) {
                  target.src = headshots.fallback2;
                } else if (target.src === headshots.fallback2) {
                  target.src = headshots.default;
                }
              }}
            />
            {player.status === 'INJURED' && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2"
              >
                INJ
              </Badge>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              {formatPlayerName(player)}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline">#{player.number}</Badge>
              <Badge>{formatPosition(player.position)}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {formatMeasurements(player.height, player.weight)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}