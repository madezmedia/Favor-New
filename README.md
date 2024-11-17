# Favor NBA Analytics

A modern, AI-powered NBA betting analytics platform built with React, TypeScript, and Vite.

![Favor NBA Analytics](https://raw.githubusercontent.com/favor-app/favor-nba/main/public/preview.png)

## Features

- 🎯 Real-time NBA odds tracking
- 🤖 AI-powered betting insights with CrewAI
- 📊 Interactive data visualization
- 🔄 Automated data synchronization
- 🎮 AI agent management system
- 🗄️ Supabase database integration
- 🌓 Dark/light mode support
- 🔒 Secure authentication with Clerk

## Live Demo

Visit [favor-nba.vercel.app](https://favor-nba.vercel.app) to see the live application.

## Tech Stack

- **Frontend**: React 18.3+ with TypeScript
- **Build Tool**: Vite
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Clerk
- **Database**: Supabase
- **AI Framework**: CrewAI
- **Data Visualization**: Recharts
- **API Integration**: 
  - NBA API (RapidAPI)
  - Sports Odds API
  - OpenRouter AI

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/favor-app/favor-nba.git
cd favor-nba
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_NBA_API_KEY=your_nba_api_key
VITE_OPENROUTER_API_KEY=your_openrouter_key
VITE_ODDS_API_KEY=your_odds_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

5. Start development server:
```bash
npm run dev
```

## Data Sync

Run data synchronization:
```bash
# Sync all data
npm run sync-data

# Individual sync commands
npm run sync-teams
npm run sync-players
npm run sync-games
npm run sync-odds
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support

For support, please:
- Create an issue in the repository
- Contact the development team
- Check the documentation