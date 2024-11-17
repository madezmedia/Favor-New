import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'next-themes';

// Base URLs for team logos with fallbacks
const BASE_URLS = {
  ESPN: 'https://a.espncdn.com/i/teamlogos/nba/500-dark',
  ESPN_LIGHT: 'https://a.espncdn.com/i/teamlogos/nba/500',
  NBA: 'https://cdn.nba.com/logos/nba',
} as const;

interface TeamLogoProps extends React.HTMLAttributes<HTMLImageElement> {
  teamId: string;
  variant?: 'primary' | 'dark' | 'light';
  fallback?: string;
}

export function TeamLogo({ 
  teamId, 
  variant = 'primary',
  fallback,
  className,
  ...props 
}: TeamLogoProps) {
  const { theme } = useTheme();
  const normalizedId = teamId.toLowerCase();

  // ESPN URL is our primary source
  const espnUrl = theme === 'dark' 
    ? `${BASE_URLS.ESPN}/${normalizedId}.png`
    : `${BASE_URLS.ESPN_LIGHT}/${normalizedId}.png`;
  
  // NBA URL as dark/light variant
  const nbaUrl = `${BASE_URLS.NBA}/${normalizedId}/primary/L/logo.svg`;

  // Get the appropriate logo based on variant and theme
  const logoUrl = variant === 'primary' 
    ? espnUrl
    : theme === 'dark'
    ? nbaUrl
    : espnUrl;

  return (
    <img
      src={logoUrl}
      className={cn("object-contain", className)}
      alt={`${teamId} logo`}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (target.src === logoUrl) {
          target.src = nbaUrl;
        } else if (target.src === nbaUrl && fallback) {
          target.src = fallback;
        } else {
          // Default ESPN fallback
          target.src = `${BASE_URLS.ESPN_LIGHT}/${normalizedId}.png`;
        }
      }}
      {...props}
    />
  );
}