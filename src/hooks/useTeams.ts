import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { TEAM_MAPPINGS, getTeamLogos } from '@/lib/mappings/teams';

export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      try {
        // Get teams from Supabase
        const { data: teamsData, error } = await supabase
          .from('teams')
          .select('*')
          .order('name');

        if (error) throw error;

        // Merge Supabase data with our mappings
        return teamsData.map((team) => {
          const mapping = TEAM_MAPPINGS[team.abbreviation];
          const logos = getTeamLogos(team.abbreviation);

          return {
            ...team,
            logos,
            externalIds: {
              nbaId: mapping?.nbaId || team.nba_api_id,
              oddsId: mapping?.oddsId || team.odds_api_id,
              rapidId: mapping?.rapidId || team.rapid_api_id,
            },
          };
        });
      } catch (error) {
        console.error('Error fetching teams:', error);
        
        // Fallback to static mappings
        return Object.entries(TEAM_MAPPINGS).map(([abbreviation, mapping]) => ({
          id: abbreviation,
          name: mapping.name,
          abbreviation,
          logos: getTeamLogos(abbreviation),
          externalIds: {
            nbaId: mapping.nbaId,
            oddsId: mapping.oddsId,
            rapidId: mapping.rapidId,
          },
        }));
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}