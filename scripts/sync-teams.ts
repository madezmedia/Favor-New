import { supabase } from '@/lib/supabase';
import { fetchTeamsFromAPI } from '@/lib/api/teams';
import { TEAM_MAPPINGS } from '@/lib/mappings/teams';

export async function syncTeams() {
  try {
    console.log('Starting team sync...');

    // Fetch teams from API
    const teams = await fetchTeamsFromAPI();

    // Map teams to our schema
    const mappedTeams = teams.map((team) => {
      const mapping = TEAM_MAPPINGS[team.abbreviation];
      
      return {
        name: team.name,
        abbreviation: team.abbreviation,
        location: team.location,
        conference: team.conference,
        division: team.division,
        color: team.color,
        alternate_color: team.alternateColor,
        logo: team.logo,
        nba_api_id: mapping?.nbaId || '',
        odds_api_id: mapping?.oddsId || team.id,
        rapid_api_id: mapping?.rapidId || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    });

    // Upsert teams to Supabase
    const { error } = await supabase
      .from('teams')
      .upsert(mappedTeams, {
        onConflict: 'abbreviation',
        ignoreDuplicates: false,
      });

    if (error) throw error;
    
    console.log(`Successfully synced ${mappedTeams.length} teams`);
  } catch (error) {
    console.error('Error syncing teams:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  syncTeams();
}

export default syncTeams;