import React from 'react';
import { Analysis } from '../types';
import { format } from 'date-fns';
import { TrendingUp, AlertCircle, BarChart } from 'lucide-react';

interface AnalysisPanelProps {
  analysis: Analysis | null;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Select teams and click analyze to get started</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <TrendingUp className="mr-2" /> 
          Analysis: {analysis.teams.team1} vs {analysis.teams.team2}
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Match Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Sport:</strong> {analysis.sport}</p>
              <p><strong>Bet Type:</strong> {analysis.betType}</p>
              <p><strong>Analysis Time:</strong> {format(new Date(analysis.timestamp), 'PPpp')}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <AlertCircle className="mr-2" /> Recommendation
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg">{analysis.recommendation}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Confidence Level</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${analysis.confidence * 20}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold flex items-center">
            <BarChart className="mr-2" /> Historical Performance
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg mt-2">
            <p className="text-gray-600">Historical performance data visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};