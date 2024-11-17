import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { getTeamDetails, mapTeamId } from '@/lib/mappings/teams';

export function useTeam(teamId: string, source: 'nba' | 'odds' | 'rapid' = 'nba') {
  return useQuery({
    queryKey: ['team', teamId, source],
    queryFn: async () => {
      // Map the team ID to our normalized format
      const normalizedId = mapTeamId(teamId, source);
      if (!normalizedId) {
        throw new Error(`Team not found for ID ${teamId} from ${source}`);
      }

      // Get team details from our mapping
      const mappedTeam = getTeamDetails(normalizedId);
      if (!mappedTeam) {
        throw new Error(`Team details not found for ${normalizedId}`);
      }

      // Get additional team data from Supabase
      const { data: teamData, error } = await supabase
        .from('teams')
        .select('*')
        .eq('abbreviation', normalizedId)
        .single();

      if (error) {
        console.error('Error fetching team data:', error);
        // Return mapped data as fallback
        return mappedTeam;
      }

      // Merge Supabase data with our mapped data
      return {
        ...mappedTeam,
        ...teamData,
      };
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}