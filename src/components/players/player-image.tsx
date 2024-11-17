import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const BASE_URLS = {
  NBA: 'https://cdn.nba.com/headshots/nba/latest/1040x760',
  ESPN: 'https://a.espncdn.com/i/headshots/nba/players/full',
  DEFAULT: '/assets/player-silhouette.png',
} as const;

interface PlayerImageProps extends React.HTMLAttributes<HTMLImageElement> {
  playerId: string;
  espnId?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PlayerImage({ 
  playerId, 
  espnId,
  size = 'md',
  className,
  ...props 
}: PlayerImageProps) {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  };

  // Primary NBA headshot URL
  const nbaUrl = `${BASE_URLS.NBA}/${playerId}.png`;
  
  // ESPN fallback URL
  const espnUrl = espnId 
    ? `${BASE_URLS.ESPN}/${espnId}.png`
    : null;

  return (
    <img
      src={nbaUrl}
      className={cn(
        "rounded-full object-cover",
        sizeClasses[size],
        className
      )}
      alt="Player headshot"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (target.src === nbaUrl && espnUrl) {
          target.src = espnUrl;
        } else if (!espnUrl || target.src === espnUrl) {
          target.src = BASE_URLS.DEFAULT;
        }
      }}
      {...props}
    />
  );
}