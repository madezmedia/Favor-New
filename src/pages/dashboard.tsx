import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TeamLogo } from '@/components/teams/team-logo';
import { ChatInterface } from '@/components/chat/chat-interface';
import { useNBAEvents } from '@/hooks/useNBAEvents';
import { useLiveOdds } from '@/hooks/useOdds';
import { format } from 'date-fns';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Calendar,
  Target,
  Brain,
  LineChart,
  DollarSign,
  ChevronRight,
} from 'lucide-react';

export default function Dashboard() {
  const { data: liveGames } = useLiveOdds();
  const { data: upcomingGames } = useNBAEvents('upcoming');

  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="space-y-8 pb-8">
        {/* Header */}
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Your NBA betting analytics overview
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Today
            </Button>
            <Button className="gap-2">
              <Target className="h-4 w-4" />
              New Analysis
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Live Games</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{liveGames?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                Currently in play
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67.5%</div>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">+15.2%</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                New recommendations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-7">
          {/* Left Column - Games and Analysis */}
          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Live Games
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {liveGames?.slice(0, 3).map((game) => (
                    <div key={game.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <TeamLogo 
                            teamId={game.homeTeam.id} 
                            className="h-8 w-8" 
                          />
                          <div>
                            <p className="font-medium">{game.homeTeam.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {game.markets.spread.home}
                              </Badge>
                              <Badge variant="secondary">
                                {game.markets.moneyline.home}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <span className="text-2xl font-bold">
                          {game.homeTeam.score || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <TeamLogo 
                            teamId={game.awayTeam.id} 
                            className="h-8 w-8" 
                          />
                          <div>
                            <p className="font-medium">{game.awayTeam.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {game.markets.spread.away}
                              </Badge>
                              <Badge variant="secondary">
                                {game.markets.moneyline.away}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <span className="text-2xl font-bold">
                          {game.awayTeam.score || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                        <span>O/U {game.markets.total.line}</span>
                        <Badge variant="secondary" className="font-mono">
                          Q4 2:45
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Betting Trends
                  </CardTitle>
                  <Badge variant="outline">Last 24 hours</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Lakers vs Warriors</p>
                      <p className="text-sm text-muted-foreground">
                        Spread movement
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="font-mono">
                        -3.5 → -4.5
                      </Badge>
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Celtics vs Nets</p>
                      <p className="text-sm text-muted-foreground">
                        Total movement
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="font-mono">
                        224.5 → 222.5
                      </Badge>
                      <TrendingUp className="h-4 w-4 rotate-180 text-destructive" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Chat */}
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ChatInterface />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Top Picks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Warriors ML (+110)</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">High Value</Badge>
                        <span className="text-sm text-muted-foreground">
                          vs Lakers
                        </span>
                      </div>
                    </div>
                    <Badge className="font-mono">85%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Celtics -5.5 (-110)</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Sharp Action</Badge>
                        <span className="text-sm text-muted-foreground">
                          vs Nets
                        </span>
                      </div>
                    </div>
                    <Badge className="font-mono">78%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}