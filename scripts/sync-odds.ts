import { supabase } from '@/lib/supabase';
import { fetchOddsFromAPI } from '@/lib/api/odds';

export async function syncOdds() {
  try {
    console.log('Starting odds sync...');

    // Get active games from Supabase
    const { data: games, error: gamesError } = await supabase
      .from('games')
      .select('id, odds_api_id')
      .in('status', ['SCHEDULED', 'LIVE']);
    
    if (gamesError) throw gamesError;

    // Fetch and sync odds for each game
    for (const game of games) {
      console.log(`Fetching odds for game ${game.odds_api_id}...`);
      
      const odds = await fetchOddsFromAPI(game.odds_api_id);
      
      const mappedOdds = odds.map((odd) => ({
        game_id: game.id,
        bookmaker: odd.bookmaker,
        market: odd.market,
        home_odds: odd.homeOdds,
        away_odds: odd.awayOdds,
        line: odd.line,
        probability: odd.probability,
        timestamp: odd.timestamp,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

      // Insert new odds to Supabase
      const { error } = await supabase
        .from('odds')
        .insert(mappedOdds);

      if (error) throw error;
      
      console.log(`Synced ${mappedOdds.length} odds for game ${game.odds_api_id}`);
      
      // Respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('Odds sync completed successfully');
  } catch (error) {
    console.error('Error syncing odds:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  syncOdds();
}

export default syncOdds;