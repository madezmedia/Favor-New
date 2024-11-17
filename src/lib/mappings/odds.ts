// Mapping functions for odds and markets
export function parseOddsString(odds: string): number {
  if (!odds) return 0;
  return parseInt(odds, 10);
}

export function formatOdds(odds: number): string {
  if (odds > 0) return `+${odds}`;
  return odds.toString();
}

export function calculateImpliedProbability(odds: number): number {
  if (odds > 0) {
    return 100 / (odds + 100);
  } else {
    const absOdds = Math.abs(odds);
    return absOdds / (absOdds + 100);
  }
}

export function mapBetType(betTypeId: string): string {
  const betTypes: Record<string, string> = {
    'ml': 'Moneyline',
    'sp': 'Spread',
    'ou': 'Over/Under',
    'prop': 'Player Prop',
  };
  return betTypes[betTypeId] || betTypeId;
}

export function mapPeriod(periodId: string): string {
  const periods: Record<string, string> = {
    'game': 'Full Game',
    '1h': '1st Half',
    '2h': '2nd Half',
    '1q': '1st Quarter',
    '2q': '2nd Quarter',
    '3q': '3rd Quarter',
    '4q': '4th Quarter',
    'ot': 'Overtime',
  };
  return periods[periodId] || periodId;
}