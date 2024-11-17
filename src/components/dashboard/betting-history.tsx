import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSheetData } from '@/hooks/useGoogleSheets';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function BettingHistory() {
  const { data: bets, isLoading, error } = useSheetData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load betting history. Please check your Google Sheets connection.
        </AlertDescription>
      </Alert>
    );
  }

  if (!bets?.length) {
    return (
      <Alert>
        <AlertDescription>
          No betting history found. Connect your Google Sheet to see your betting data.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Betting History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Game</TableHead>
                <TableHead>Bet Type</TableHead>
                <TableHead>Odds</TableHead>
                <TableHead>Result</TableHead>
                <TableHead className="text-right">Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bets.map((bet, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {format(new Date(bet.date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>{bet.game}</TableCell>
                  <TableCell>{bet.betType}</TableCell>
                  <TableCell>{bet.odds}</TableCell>
                  <TableCell>
                    <Badge
                      variant={bet.result.toLowerCase() === 'win' ? 'default' : 'destructive'}
                    >
                      {bet.result}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={bet.profit >= 0 ? 'text-green-500' : 'text-red-500'}>
                      ${bet.profit.toFixed(2)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}