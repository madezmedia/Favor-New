import { format } from 'date-fns';
import { DailyEvent } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DailyEventsProps {
  events: DailyEvent[];
}

export function DailyEvents({ events }: DailyEventsProps) {
  if (!events?.length) {
    return (
      <Alert>
        <AlertDescription>
          No NBA games scheduled for today. Check back later for upcoming games.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card 
            key={event.id}
            className="hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/80"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {event.sport}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {format(new Date(event.Date), 'h:mm a')}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                {/* Away Team */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-accent/10">
                      {event.teams.away.logo && (
                        <img
                          src={event.teams.away.logo}
                          alt={event.teams.away.name}
                          className="w-full h-full object-contain p-2"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{event.teams.away.city}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.teams.away.name}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{event.teams.away.abbreviation}</Badge>
                </div>
                
                {/* VS Divider */}
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-sm font-medium text-muted-foreground">VS</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                
                {/* Home Team */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-accent/10">
                      {event.teams.home.logo && (
                        <img
                          src={event.teams.home.logo}
                          alt={event.teams.home.name}
                          className="w-full h-full object-contain p-2"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{event.teams.home.city}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.teams.home.name}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{event.teams.home.abbreviation}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}