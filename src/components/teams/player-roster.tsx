import { Player } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface PlayerRosterProps {
  players: Player[];
  isLoading: boolean;
}

export function PlayerRoster({ players, isLoading }: PlayerRosterProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[800px]">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {players.map((player) => (
          <Card key={player.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-0 pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <img
                      src={player.headshot.href}
                      alt={player.displayName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {player.injuries?.length > 0 && (
                      <div className="absolute -top-1 -right-1">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      </div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {player.displayName}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">#{player.jersey}</Badge>
                      <Badge>{player.position.name}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-muted-foreground">Height:</span>
                    <span className="ml-1">
                      {Math.floor(player.height / 12)}'{player.height % 12}"
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="ml-1">{player.weight} lbs</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Age:</span>
                    <span className="ml-1">{player.age}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="ml-1">{player.experience.years} yrs</span>
                  </div>
                </div>
                
                {player.college && (
                  <div>
                    <span className="text-muted-foreground">College:</span>
                    <span className="ml-1">{player.college.name}</span>
                  </div>
                )}
                
                <div>
                  <span className="text-muted-foreground">From:</span>
                  <span className="ml-1">
                    {player.birthPlace.city}
                    {player.birthPlace.state ? `, ${player.birthPlace.state}` : ''}, {player.birthPlace.country}
                  </span>
                </div>

                {player.injuries?.length > 0 && (
                  <div className="pt-2 border-t">
                    <Badge variant="destructive">
                      {player.injuries[0].status} - {format(new Date(player.injuries[0].date), 'MMM d, yyyy')}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}