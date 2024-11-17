import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOddsComparison } from '@/hooks/useOdds';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export function BettingTrends() {
  const { data: oddsData } = useOddsComparison('latest');

  const chartData = oddsData?.map((data) => ({
    time: format(new Date(data.lastUpdate), 'HH:mm'),
    moneyline: data.markets.moneyline?.home || 0,
    spread: data.markets.spread?.home || 0,
  })) || [];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Betting Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="moneyline" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="spread" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}