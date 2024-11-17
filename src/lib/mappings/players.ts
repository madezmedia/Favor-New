import { z } from 'zod';
import { supabase } from '@/lib/supabase';

// Base URLs for player images
const BASE_URLS = {
  NBA: 'https://cdn.nba.com/headshots/nba/latest/1040x760',
  ESPN: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full',
  RAPID: 'https://nba-api-free-data.p.rapidapi.com/player-image',
} as const;

// Player schema for validation
export const PlayerSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  number: z.string(),
  position: z.string(),
  height: z.number(),
  weight: z.number(),
  birthDate: z.string(),
  teamId: z.string(),
  headshot: z.string(),
  externalIds: z.object({
    nbaId: z.string(),
    espnId: z.string(),
    rapidId: z.string(),
  }),
});

export type Player = z.infer<typeof PlayerSchema>;

// Get player headshot URL with fallbacks
export function getPlayerHeadshot(
  player: Player,
  size: 'small' | 'medium' | 'large' = 'medium'
): {
  primary: string;
  fallback1: string;
  fallback2: string;
  default: string;
} {
  const sizes = {
    small: '260x190',
    medium: '1040x760',
    large: '2048x1536',
  };

  // Try NBA headshot first
  const nbaUrl = `${BASE_URLS.NBA}/${player.externalIds.nbaId}.png`;
  
  // ESPN fallback
  const espnUrl = `${BASE_URLS.ESPN}/${player.externalIds.espnId}.png`;
  
  // RapidAPI fallback
  const rapidUrl = `${BASE_URLS.RAPID}?id=${player.externalIds.rapidId}`;

  // Default silhouette
  const defaultUrl = '/assets/player-silhouette.png';

  return {
    primary: nbaUrl,
    fallback1: espnUrl,
    fallback2: rapidUrl,
    default: defaultUrl,
  };
}

// Format player name consistently
export function formatPlayerName(player: Player): string {
  return `${player.firstName} ${player.lastName}`;
}

// Format player position
export function formatPosition(position: string): string {
  const positions: Record<string, string> = {
    'G': 'Guard',
    'F': 'Forward',
    'C': 'Center',
    'G-F': 'Guard/Forward',
    'F-C': 'Forward/Center',
  };
  return positions[position] || position;
}

// Format player measurements
export function formatMeasurements(height: number, weight: number): string {
  const feet = Math.floor(height / 12);
  const inches = height % 12;
  return `${feet}'${inches}" - ${weight} lbs`;
}

// Find player by ID from any source
export async function findPlayerById(
  playerId: string,
  source: 'nba' | 'espn' | 'rapid' = 'nba'
): Promise<Player | null> {
  try {
    const { data: player, error } = await supabase
      .from('players')
      .select('*')
      .eq(
        source === 'nba' ? 'nba_api_id' : 
        source === 'espn' ? 'odds_api_id' : 
        'rapid_api_id', 
        playerId
      )
      .single();

    if (error) throw error;
    return player ? PlayerSchema.parse(player) : null;
  } catch (error) {
    console.error('Error finding player:', error);
    return null;
  }
}

// Find player by name
export async function findPlayerByName(name: string): Promise<Player | null> {
  try {
    const { data: player, error } = await supabase
      .from('players')
      .select('*')
      .eq('full_name', name)
      .single();

    if (error) throw error;
    return player ? PlayerSchema.parse(player) : null;
  } catch (error) {
    console.error('Error finding player by name:', error);
    return null;
  }
}

// Normalize player name for consistent matching
export function normalizePlayerName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-');
}