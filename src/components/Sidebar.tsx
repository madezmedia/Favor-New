import React from 'react';
import { Sport, BetType } from '../types';
import { ChevronRight } from 'lucide-react';

interface SidebarProps {
  onAnalyze: (data: {
    sport: Sport;
    betType: BetType;
    team1: string;
    team2: string;
  }) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAnalyze }) => {
  const [sport, setSport] = React.useState<Sport>('NFL');
  const [betType, setBetType] = React.useState<BetType>('Spread');
  const [team1, setTeam1] = React.useState('');
  const [team2, setTeam2] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (team1 && team2) {
      onAnalyze({ sport, betType, team1, team2 });
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg p-4 h-screen">
      <h2 className="text-xl font-bold mb-6">Analysis Parameters</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Sport</label>
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value as Sport)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {['NFL', 'NBA', 'MLB', 'NHL', 'Soccer'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bet Type</label>
          <select
            value={betType}
            onChange={(e) => setBetType(e.target.value as BetType)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {['Spread', 'Moneyline', 'Over/Under', 'Parlay'].map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Team 1</label>
          <input
            type="text"
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter team name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Team 2</label>
          <input
            type="text"
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter team name"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Analyze <ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </form>
    </div>
  );
};