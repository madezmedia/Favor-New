import { supabase } from '@/lib/supabase';
import { fetchGamesFromAPI } from '@/lib/api/games';

export async function syncGames() {
  try {
    console.log('Starting games sync...');

    // Fetch upcoming and live games
    const games = await fetchGamesFromAPI();

    // Map games to our schema
    const mappedGames = games.map((game) => ({
      start_time: game.startTime,
      status: game.status,
      home_team_id: game.homeTeamId,
      away_team_id: game.awayTeamId,
      season: game.season,
      game_type: game.gameType,
      nba_api_id: game.nbaApiId,
      odds_api_id: game.oddsApiId,
      rapid_api_id: game.rapidApiId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    // Upsert games to Supabase
    const { error } = await supabase
      .from('games')
      .upsert(mappedGames, {
        onConflict: 'nba_api_id',
        ignoreDuplicates: false,
      });

    if (error) throw error;
    
    console.log(`Successfully synced ${mappedGames.length} games`);
  } catch (error) {
    console.error('Error syncing games:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  syncGames();
}

export default syncGames;