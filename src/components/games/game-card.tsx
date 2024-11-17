import { Game } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TeamLogo } from '@/components/teams/team-logo';
import { format } from 'date-fns';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Badge variant="outline">
            {format(new Date(game.date), 'MMM d, yyyy')}
          </Badge>
          <Badge variant="secondary" className="font-mono">
            O/U {game.overUnder}
          </Badge>
        </div>

        <div className="space-y-4">
          {/* Home Team */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <TeamLogo 
                teamId={game.homeTeam.abbreviation}
                className="w-8 h-8"
                variant="primary"
              />
              <div>
                <span className="font-semibold">{game.homeTeam.displayName}</span>
                <Badge variant="outline" className="ml-2">
                  {game.homeSpread > 0 ? '+' : ''}{game.homeSpread}
                </Badge>
              </div>
            </div>
            <span className="text-sm font-mono">
              {game.homeOdds > 0 ? '+' : ''}{game.homeOdds}
            </span>
          </div>

          {/* Away Team */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <TeamLogo 
                teamId={game.awayTeam.abbreviation}
                className="w-8 h-8"
                variant="primary"
              />
              <div>
                <span className="font-semibold">{game.awayTeam.displayName}</span>
                <Badge variant="outline" className="ml-2">
                  {game.awaySpread > 0 ? '+' : ''}{game.awaySpread}
                </Badge>
              </div>
            </div>
            <span className="text-sm font-mono">
              {game.awayOdds > 0 ? '+' : ''}{game.awayOdds}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}