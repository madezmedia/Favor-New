import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, AlertTriangle, Percent } from 'lucide-react';

export function BettingInsights() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sharp Money</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Lakers vs Celtics</span>
              <Badge>75%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Warriors vs Suns</span>
              <Badge>62%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Public Betting</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Lakers ML</span>
              <Badge variant="secondary">68%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Warriors -5.5</span>
              <Badge variant="secondary">55%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Key Injuries</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>LeBron James</span>
              <Badge variant="destructive">Out</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Stephen Curry</span>
              <Badge variant="secondary">GTD</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Line Movement</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>LAL/BOS O/U</span>
              <div className="flex items-center space-x-1">
                <span>220.5</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>GSW Spread</span>
              <div className="flex items-center space-x-1">
                <span>-5.5</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}