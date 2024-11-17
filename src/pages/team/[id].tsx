import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTeamDetails } from '@/lib/api';
import { TeamDetailsView } from '@/components/teams/team-details-view';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export default function TeamPage() {
  const { id } = useParams<{ id: string }>();
  const { data: teamDetails, isLoading, error } = useQuery({
    queryKey: ['team', id],
    queryFn: () => fetchTeamDetails(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load team details. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!teamDetails) {
    return (
      <Alert>
        <AlertDescription>Team not found.</AlertDescription>
      </Alert>
    );
  }

  return <TeamDetailsView team={teamDetails} />;
}