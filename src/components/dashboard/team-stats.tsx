import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NBATeam } from '@/types';

interface TeamStatsProps {
  teams: NBATeam[];
}

export function TeamStats({ teams }: TeamStatsProps) {
  return (
    <ScrollArea className="h-[600px]">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <img 
                src={team.logo} 
                alt={team.displayName} 
                className="w-12 h-12 mr-4"
              />
              <div>
                <CardTitle className="text-base font-medium">
                  {team.displayName}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {team.location}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">ATS Record</p>
                  <p className="text-2xl font-bold">12-8-1</p>
                </div>
                <div>
                  <p className="text-sm font-medium">O/U Record</p>
                  <p className="text-2xl font-bold">11-10</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Home ATS</p>
                  <p className="text-2xl font-bold">7-4</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Away ATS</p>
                  <p className="text-2xl font-bold">5-4-1</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Last 5 ATS</span>
                  <div className="flex space-x-1">
                    <Badge variant="default">W</Badge>
                    <Badge variant="destructive">L</Badge>
                    <Badge variant="default">W</Badge>
                    <Badge variant="default">W</Badge>
                    <Badge variant="secondary">P</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}