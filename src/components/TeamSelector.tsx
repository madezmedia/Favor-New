import React, { useRef } from 'react';
import { NBATeam } from '../types';
import { TeamCard } from './TeamCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamSelectorProps {
  teams: NBATeam[];
  selectedTeams: NBATeam[];
  onTeamSelect: (team: NBATeam) => void;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({
  teams,
  selectedTeams,
  onTeamSelect,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full py-6">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <div
        ref={scrollRef}
        className="flex overflow-x-auto hide-scrollbar gap-4 px-12"
        style={{ scrollBehavior: 'smooth' }}
      >
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            isSelected={selectedTeams.some((t) => t.id === team.id)}
            onSelect={onTeamSelect}
          />
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};