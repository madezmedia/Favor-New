# Favor Developer Documentation

## Overview
Favor is a modern NBA betting analytics platform built with React, TypeScript, and Vite. The platform provides real-time odds tracking, AI-powered analysis, and comprehensive team statistics.

## Tech Stack
- **Frontend**: React 18.3+, TypeScript, Vite
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Clerk
- **APIs**: 
  - NBA API (RapidAPI)
  - OpenRouter AI
  - Player Props API

## Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── dashboard/     # Dashboard-specific components
│   ├── games/        # Game-related components
│   ├── teams/        # Team-related components
│   ├── odds/         # Odds-related components
│   └── ui/           # Base UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and API clients
├── pages/            # Route components
├── services/         # API service layers
└── types/            # TypeScript type definitions
```

## Core Features

### 1. Real-time Odds Tracking
- WebSocket integration for live updates
- Multiple sportsbook integration
- Line movement visualization
- Public betting percentages

### 2. Team Analytics
- Comprehensive team statistics
- Head-to-head analysis
- Historical performance data
- Injury tracking

### 3. AI-Powered Insights
- OpenRouter AI integration
- Natural language analysis
- Trend identification
- Risk assessment

## API Integration

### NBA API
```typescript
const NBA_API_KEY = import.meta.env.VITE_NBA_API_KEY;

// Base configuration
const nbaApi = axios.create({
  baseURL: 'https://nba-api-free-data.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': NBA_API_KEY,
    'x-rapidapi-host': 'nba-api-free-data.p.rapidapi.com',
  },
});

// Endpoints
- GET /nba-team-list
- GET /nba-team-info/v1/data
- GET /nba-player-listing/v1/data
```

### OpenRouter AI
```typescript
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// Base configuration
const aiApi = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Endpoints
- POST /chat
```

## State Management

### React Query Configuration
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

## Authentication Flow

### Clerk Integration
```typescript
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
</ClerkProvider>
```

## Performance Optimization

### Code Splitting
- Route-based splitting
- Component lazy loading
- Dynamic imports for heavy features

### Caching Strategy
- React Query for server state
- Local storage for preferences
- Service worker for assets

## Development Workflow

### Environment Setup
1. Clone repository
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
```bash
cp .env.example .env
```
4. Start development server:
```bash
npm run dev
```

### Code Style
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component-based architecture

## Testing Strategy

### Unit Tests
- Component testing with React Testing Library
- Hook testing
- Utility function testing

### Integration Tests
- API integration tests
- Authentication flow tests
- User journey tests

## Deployment

### Build Process
```bash
npm run build
```

### Netlify Configuration
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Roadmap

### Phase 1 (Current)
- [x] Basic dashboard layout
- [x] NBA teams integration
- [x] Games overview
- [x] Basic betting insights
- [x] Team statistics

### Phase 2 (Next Sprint)
- [ ] Real-time odds tracking
- [ ] Line movement charts
- [ ] Public betting percentages
- [ ] Sharp money indicators
- [ ] Advanced team statistics

### Phase 3 (Future)
- [ ] AI-powered predictions
- [ ] Custom alerts system
- [ ] Historical trends analysis
- [ ] Mobile app development
- [ ] Social features

## Next Steps

### Immediate Priorities
1. Implement real-time odds tracking
   - WebSocket integration
   - Multiple sportsbook data
   - Line movement visualization

2. Enhance betting insights
   - Public betting percentages
   - Sharp money indicators
   - Consensus picks

3. Improve user experience
   - Loading states
   - Error handling
   - Responsive design
   - Accessibility

### Technical Debt
1. Code optimization
   - Bundle size reduction
   - Performance monitoring
   - Memory management

2. Testing coverage
   - Unit tests
   - Integration tests
   - E2E testing

3. Documentation
   - API documentation
   - Component storybook
   - User guides

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on:
- Code style
- Pull request process
- Testing requirements
- Documentation standards

## Support
For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.