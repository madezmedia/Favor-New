import axios from 'axios';
import { format } from 'date-fns';
import { getAccessToken } from './auth';

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;

export interface BettingData {
  date: string;
  sport: string;
  league: string;
  game: string;
  betType: string;
  odds: number;
  stake: number;
  result: string;
  profit: number;
  notes: string;
}

export async function fetchSheetData(): Promise<BettingData[]> {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error('Not authenticated');

  try {
    const response = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A2:J`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const rows = response.data.values;
    if (!rows?.length) return [];

    return rows.map(row => ({
      date: row[0],
      sport: row[1],
      league: row[2],
      game: row[3],
      betType: row[4],
      odds: parseFloat(row[5]),
      stake: parseFloat(row[6]),
      result: row[7],
      profit: parseFloat(row[8]),
      notes: row[9] || '',
    }));
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

export async function fetchBettingStats() {
  const data = await fetchSheetData();
  
  return {
    totalBets: data.length,
    winRate: calculateWinRate(data),
    totalProfit: calculateTotalProfit(data),
    profitByDay: calculateProfitByDay(data),
    profitBySport: calculateProfitBySport(data),
  };
}

function calculateWinRate(data: BettingData[]): number {
  const wins = data.filter(bet => bet.result.toLowerCase() === 'win').length;
  return data.length ? (wins / data.length) * 100 : 0;
}

function calculateTotalProfit(data: BettingData[]): number {
  return data.reduce((total, bet) => total + bet.profit, 0);
}

function calculateProfitByDay(data: BettingData[]): Record<string, number> {
  return data.reduce((acc, bet) => {
    const day = format(new Date(bet.date), 'yyyy-MM-dd');
    acc[day] = (acc[day] || 0) + bet.profit;
    return acc;
  }, {} as Record<string, number>);
}

function calculateProfitBySport(data: BettingData[]): Record<string, number> {
  return data.reduce((acc, bet) => {
    acc[bet.sport] = (acc[bet.sport] || 0) + bet.profit;
    return acc;
  }, {} as Record<string, number>);
}