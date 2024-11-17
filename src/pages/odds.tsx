import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLiveOdds, useUpcomingGames } from '@/hooks/useOdds';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OddsComparison } from '@/components/odds/odds-comparison';
import { LineMovements } from '@/components/odds/line-movements';
import { PlayerOddsGrid } from '@/components/odds/player-odds-grid';
import { format } from 'date-fns';
import { Activity, TrendingUp, Users } from 'lucide-react';

export default function LiveOdds() {
  const { data: liveGames } = useLiveOdds();
  const { data: upcomingGames } = useUpcomingGames();

  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="space-y-8 pb-8">
        {/* Header */}
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Live Odds</h2>
            <p className="text-muted-foreground">
              Real-time odds tracking and line movements
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Live Games</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{liveGames?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Currently playing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Line Movements</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Last hour</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bettors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2K</div>
              <p className="text-xs text-muted-foreground">Public betting</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="live" className="space-y-4">
          <TabsList>
            <TabsTrigger value="live">Live Games</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="props">Player Props</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            <div className="grid gap-4">
              {liveGames?.map((game) => (
                <Card key={game.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        LIVE
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(game.startTime), 'h:mm a')}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Teams and Scores */}
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{game.homeTeam.name}</p>
                            <Badge variant="outline">
                              {game.markets.spread.home}
                            </Badge>
                          </div>
                          <span className="text-2xl font-bold">
                            {game.homeTeam.score || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{game.awayTeam.name}</p>
                            <Badge variant="outline">
                              {game.markets.spread.away}
                            </Badge>
                          </div>
                          <span className="text-2xl font-bold">
                            {game.awayTeam.score || 0}
                          </span>
                        </div>
                      </div>

                      {/* Odds Comparison */}
                      <OddsComparison gameId={game.id} />

                      {/* Line Movements */}
                      <LineMovements gameId={game.id} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4">
              {upcomingGames?.map((game) => (
                <Card key={game.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">
                        {format(new Date(game.startTime), 'MMM d, h:mm a')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Teams and Odds */}
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{game.homeTeam.name}</p>
                            <div className="flex gap-2">
                              <Badge variant="outline">
                                {game.markets.spread.home}
                              </Badge>
                              <Badge variant="secondary">
                                {game.markets.moneyline.home}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{game.awayTeam.name}</p>
                            <div className="flex gap-2">
                              <Badge variant="outline">
                                {game.markets.spread.away}
                              </Badge>
                              <Badge variant="secondary">
                                {game.markets.moneyline.away}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Odds Comparison */}
                      <OddsComparison gameId={game.id} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="props" className="space-y-4">
            {liveGames?.map((game) => (
              <Card key={game.id}>
                <CardHeader>
                  <CardTitle>
                    {game.homeTeam.name} vs {game.awayTeam.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PlayerOddsGrid eventId={game.id} />
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}