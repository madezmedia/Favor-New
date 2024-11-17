import { TeamDetails, Player } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayerRoster } from './player-roster';
import { useTeamPlayers } from '@/hooks/useNBAData';
import {
  Trophy,
  Users,
  Building2,
  Calendar,
  TrendingUp,
  Activity,
  Link as LinkIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamDetailsViewProps {
  team: TeamDetails;
}

export function TeamDetailsView({ team }: TeamDetailsViewProps) {
  const { data: players, isLoading: isLoadingPlayers } = useTeamPlayers(team.team.id);
  const [wins, losses] = team.team.recordSummary.split('-').map(Number);
  const winPercentage = (wins / (wins + losses)) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img 
            src={team.team.logo} 
            alt={team.team.displayName} 
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold">{team.team.displayName}</h1>
            <p className="text-muted-foreground">{team.team.standingSummary}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => window.open(team.team.clubhouse, '_blank')}
        >
          <LinkIcon className="h-4 w-4" />
          Team Clubhouse
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roster">Roster</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Team Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{team.team.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Abbreviation</p>
                    <p className="font-medium">{team.team.abbreviation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Season</p>
                    <p className="font-medium">{team.season.displayName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Season Type</p>
                    <p className="font-medium">{team.season.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Coaching Staff
                </CardTitle>
              </CardHeader>
              <CardContent>
                {team.coach.map((coach) => (
                  <div key={coach.id} className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Head Coach</p>
                      <p className="font-medium">
                        {coach.firstName} {coach.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p className="font-medium">{coach.experience} years</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Season Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Wins</p>
                    <p className="text-2xl font-bold">{wins}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Losses</p>
                    <p className="text-2xl font-bold">{losses}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Win %</p>
                    <p className="text-2xl font-bold">
                      {winPercentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Badge variant="secondary" className="text-sm">
                    {team.team.seasonSummary}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundColor: `#${team.team.color}`,
                }}
              />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Team Colors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Primary Color</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: `#${team.team.color}` }}
                      />
                      <code>#{team.team.color}</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roster">
          <PlayerRoster players={players || []} isLoading={isLoadingPlayers} />
        </TabsContent>
      </Tabs>
    </div>
  );
}