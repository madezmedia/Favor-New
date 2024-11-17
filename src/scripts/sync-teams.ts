import { fetchAndMapTeams } from '@/lib/api/teams';

async function syncTeams() {
  try {
    console.log('Starting team synchronization...');
    const result = await fetchAndMapTeams();
    console.log('Team synchronization completed:', result);
  } catch (error) {
    console.error('Error synchronizing teams:', error);
    process.exit(1);
  }
}

// Run the sync if this script is executed directly
if (require.main === module) {
  syncTeams();
}

export default syncTeams;