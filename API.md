## Favor NBA Analytics API Documentation

### Authentication

All API requests require authentication using API keys in the request headers.

```typescript
const headers = {
  'X-API-Key': process.env.VITE_API_KEY,
  'Content-Type': 'application/json'
};
```

### Database Integration

#### Supabase Configuration
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);
```

### AI Agents

#### 1. Agent Configuration
```typescript
interface Agent {
  id: string;
  name: string;
  role: string;
  goal: string;
  backstory: string;
}

// Create agent
const agent = {
  id: 'data-analyst',
  name: 'Data Analyst',
  role: 'Data Analyst',
  goal: 'Analyze sports data and betting trends',
  backstory: 'Expert in sports analytics',
};
```

#### 2. Run Analysis
```typescript
POST /api/agents/analyze
Headers:
  Authorization: Bearer ${API_KEY}

Body:
{
  agentId: string;
  data: {
    game: GameData;
    odds: OddsData;
    trends: TrendsData;
  }
}

Response:
{
  analysis: {
    type: string;
    confidence: number;
    recommendations: string[];
    timestamp: string;
  }
}
```

### NBA API Integration

#### 1. Teams Endpoint
```typescript
GET /teams
Headers:
  x-rapidapi-key: ${NBA_API_KEY}
  x-rapidapi-host: nba-api-free-data.p.rapidapi.com

Response:
{
  teams: Array<{
    id: string;
    abbreviation: string;
    displayName: string;
    location: string;
    color: string;
    logo: string;
  }>
}
```

### Sports Odds API

#### 1. Live Events
```typescript
GET /events/live
Headers:
  Authorization: Bearer ${ODDS_API_KEY}

Response:
{
  events: Array<{
    id: string;
    startTime: string;
    teams: {
      home: Team;
      away: Team;
    };
    odds: {
      moneyline: MoneylineOdds;
      spread: SpreadOdds;
      total: TotalOdds;
    };
  }>
}
```

### Data Sync API

#### 1. Sync Teams
```typescript
POST /api/sync/teams
Headers:
  Authorization: Bearer ${API_KEY}

Response:
{
  success: boolean;
  syncedCount: number;
  timestamp: string;
}
```

### Error Handling

```typescript
interface APIError {
  status: number;
  message: string;
  code: string;
}

// Example error response
{
  status: 429,
  message: "Rate limit exceeded",
  code: "RATE_LIMIT"
}
```

### Rate Limits

- NBA API: 100 requests per minute
- Sports Odds API: 60 requests per minute
- Supabase: Depends on tier
- Data Sync: Every 6 hours

### Type Definitions

```typescript
interface Team {
  id: string;
  name: string;
  abbreviation: string;
  location: string;
  conference: string;
  division: string;
}

interface Game {
  id: string;
  startTime: string;
  status: GameStatus;
  homeTeamId: string;
  awayTeamId: string;
}

interface Odds {
  gameId: string;
  bookmaker: string;
  market: string;
  homeOdds: number;
  awayOdds: number;
}

interface AgentAnalysis {
  id: string;
  agentId: string;
  analysis: unknown;
  createdAt: string;
}
```

### WebSocket Integration

```typescript
interface WebSocketMessage {
  type: 'odds_update' | 'line_movement';
  data: unknown;
  timestamp: string;
}
```

### Authentication Flow

```typescript
// Clerk configuration
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
</ClerkProvider>
```

### Caching Strategy

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});
```