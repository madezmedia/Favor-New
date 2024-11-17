import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function Trends() {
  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="space-y-8 pb-8">
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Trends</h2>
            <p className="text-muted-foreground">
              Historical betting trends and patterns
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Market Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Trends content will go here */}
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}