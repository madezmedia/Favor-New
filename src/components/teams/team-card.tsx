import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { TeamLogo } from './team-logo';
import { NBATeam } from '@/types';

interface TeamCardProps {
  team: NBATeam;
  className?: string;
}

export function TeamCard({ team, className }: TeamCardProps) {
  return (
    <Link to={`/app/teams/${team.id}`}>
      <Card className={cn(
        "group hover:shadow-lg transition-all bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/80",
        className
      )}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-accent/10">
              <TeamLogo
                teamId={team.abbreviation}
                className="w-full h-full p-2"
                variant="primary"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{team.displayName}</h3>
              <p className="text-sm text-muted-foreground">{team.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}