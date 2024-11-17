import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Play, Pause, LucideIcon } from 'lucide-react';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    icon: LucideIcon;
    description: string;
    backstory: string;
  };
  status: 'idle' | 'running' | 'stopped';
  selected?: boolean;
  onStart: () => void;
  onStop: () => void;
  onSelect: () => void;
}

export function AgentCard({
  agent,
  status,
  selected,
  onStart,
  onStop,
  onSelect,
}: AgentCardProps) {
  const Icon = agent.icon;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg",
        selected && "ring-2 ring-primary",
        status === 'running' && "bg-primary/5"
      )}
      onClick={onSelect}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {agent.name}
          </CardTitle>
          <Badge
            variant={status === 'running' ? 'default' : 'secondary'}
            className="capitalize"
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {agent.description}
        </p>
        <div className="flex items-center gap-2">
          {status === 'running' ? (
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onStop();
              }}
            >
              <Pause className="h-4 w-4" />
              Stop Agent
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onStart();
              }}
            >
              <Play className="h-4 w-4" />
              Start Agent
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}