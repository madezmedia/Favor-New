import { SportsbookGrid } from '@/components/sportsbooks/sportsbook-grid';

export default function Sportsbooks() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Sportsbooks</h2>
          <p className="text-muted-foreground">
            Compare odds and place bets across multiple sportsbooks.
          </p>
        </div>
      </div>
      <SportsbookGrid />
    </div>
  );
}