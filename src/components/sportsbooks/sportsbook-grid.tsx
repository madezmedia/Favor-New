import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';

const ACTIVE_SPORTSBOOKS = [
  {
    id: 'fanduel',
    name: 'FanDuel',
    logo: 'https://images.unsplash.com/photo-1541744573515-478c959628a0?w=200&h=200&fit=crop&auto=format',
    status: 'active',
  },
  {
    id: 'draftkings',
    name: 'DraftKings',
    logo: 'https://images.unsplash.com/photo-1541744573515-478c959628a0?w=200&h=200&fit=crop&auto=format',
    status: 'active',
  },
  {
    id: 'bet365',
    name: 'bet365',
    logo: 'https://images.unsplash.com/photo-1541744573515-478c959628a0?w=200&h=200&fit=crop&auto=format',
    status: 'active',
  },
];

const COMING_SOON_SPORTSBOOKS = [
  {
    id: 'betmgm',
    name: 'BetMGM',
    logo: 'https://images.unsplash.com/photo-1541744573515-478c959628a0?w=200&h=200&fit=crop&auto=format',
    status: 'coming-soon',
  },
  {
    id: 'caesars',
    name: 'Caesars',
    logo: 'https://images.unsplash.com/photo-1541744573515-478c959628a0?w=200&h=200&fit=crop&auto=format',
    status: 'coming-soon',
  },
  {
    id: 'pointsbet',
    name: 'PointsBet',
    logo: 'https://images.unsplash.com/photo-1541744573515-478c959628a0?w=200&h=200&fit=crop&auto=format',
    status: 'coming-soon',
  },
];

export function SportsbookGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ACTIVE_SPORTSBOOKS.map((sportsbook) => (
        <Card 
          key={sportsbook.id}
          className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/80"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-accent/10 p-2">
                  <img
                    src={sportsbook.logo}
                    alt={sportsbook.name}
                    className="w-full h-full object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{sportsbook.name}</h3>
                  <Badge variant="secondary" className="mt-1">Active</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {COMING_SOON_SPORTSBOOKS.map((sportsbook) => (
        <Card 
          key={sportsbook.id}
          className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/80"
        >
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center">
              <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <span className="font-semibold text-muted-foreground">Coming Soon</span>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-accent/10 p-2">
                  <img
                    src={sportsbook.logo}
                    alt={sportsbook.name}
                    className="w-full h-full object-contain grayscale"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{sportsbook.name}</h3>
                  <Badge variant="outline" className="mt-1">Coming Soon</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}