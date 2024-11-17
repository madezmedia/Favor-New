import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, TrendingUp } from 'lucide-react';

export default function Analysis() {
  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="space-y-8 pb-8">
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Analysis</h2>
            <p className="text-muted-foreground">
              AI-powered betting insights and recommendations
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Latest Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Analysis content will go here */}
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}