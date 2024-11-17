import React from 'react';
import { NBATeam } from '../types';

interface TeamCardProps {
  team: NBATeam;
  isSelected: boolean;
  onSelect: (team: NBATeam) => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team, isSelected, onSelect }) => {
  return (
    <div
      className={`flex-shrink-0 w-64 h-80 m-2 rounded-xl shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        isSelected ? 'ring-4 ring-indigo-500' : ''
      }`}
      style={{
        background: `linear-gradient(135deg, #${team.color} 0%, #${team.alternateColor} 100%)`,
      }}
      onClick={() => onSelect(team)}
    >
      <div className="h-full flex flex-col items-center justify-center p-4 bg-black bg-opacity-20">
        <img
          src={team.logo}
          alt={team.displayName}
          className="w-32 h-32 object-contain mb-4"
        />
        <h3 className="text-xl font-bold text-white text-center mb-2">
          {team.displayName}
        </h3>
        <p className="text-white text-opacity-80 text-center">
          {team.location}
        </p>
      </div>
    </div>
  );
};