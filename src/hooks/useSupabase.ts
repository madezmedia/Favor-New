import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, handleSupabaseError } from '@/lib/supabase';

// Teams
export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('name');
      
      if (error) throw handleSupabaseError(error);
      return data;
    },
  });
}

// Players
export function usePlayers(teamId?: string) {
  return useQuery({
    queryKey: ['players', teamId],
    queryFn: async () => {
      let query = supabase.from('players').select('*');
      if (teamId) query = query.eq('team_id', teamId);
      
      const { data, error } = await query.order('full_name');
      if (error) throw handleSupabaseError(error);
      return data;
    },
    enabled: !teamId || !!teamId,
  });
}

// Games
export function useGames(status: 'LIVE' | 'SCHEDULED' = 'LIVE') {
  return useQuery({
    queryKey: ['games', status],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          home_team:teams!home_team_id(*),
          away_team:teams!away_team_id(*)
        `)
        .eq('status', status)
        .order('start_time');
      
      if (error) throw handleSupabaseError(error);
      return data;
    },
  });
}

// Odds
export function useOdds(gameId: string) {
  return useQuery({
    queryKey: ['odds', gameId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('odds')
        .select('*')
        .eq('game_id', gameId)
        .order('timestamp', { ascending: false });
      
      if (error) throw handleSupabaseError(error);
      return data;
    },
    enabled: !!gameId,
  });
}

// Bets
export function useBets(userId: string) {
  return useQuery({
    queryKey: ['bets', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bets')
        .select(`
          *,
          game:games(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw handleSupabaseError(error);
      return data;
    },
    enabled: !!userId,
  });
}

// Mutations
export function useCreateBet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bet: any) => {
      const { data, error } = await supabase
        .from('bets')
        .insert(bet)
        .select()
        .single();
      
      if (error) throw handleSupabaseError(error);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bets', variables.user_id] });
    },
  });
}