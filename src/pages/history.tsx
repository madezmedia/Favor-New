import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History as HistoryIcon } from 'lucide-react';

export default function History() {
  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="space-y-8 pb-8">
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">History</h2>
            <p className="text-muted-foreground">
              Your betting history and performance
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HistoryIcon className="h-5 w-5" />
                Betting History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* History content will go here */}
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}