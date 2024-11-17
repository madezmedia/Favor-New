import { TeamsGrid } from '@/components/teams/teams-grid';

export default function Teams() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">NBA Teams</h1>
      </div>
      <TeamsGrid />
    </div>
  );
}