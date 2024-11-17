import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { GameOdds, ProcessedGameOdds } from '@/types/odds';

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const CLIENT_EMAIL = import.meta.env.VITE_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = import.meta.env.VITE_GOOGLE_PRIVATE_KEY;

const jwt = new JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const doc = new GoogleSpreadsheet(SHEET_ID, jwt);

export async function fetchOddsData(): Promise<ProcessedGameOdds[]> {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  const oddsMap = new Map<string, GameOdds[]>();
  
  rows.forEach(row => {
    const odds: GameOdds = {
      game_id: row.game_id,
      commence_time: row.commence_time,
      in_play: row.in_play === 'TRUE',
      bookmaker: row.bookmaker,
      last_update: row.last_update,
      home_team: row.home_team,
      away_team: row.away_team,
      market: row.market,
      label: row.label,
      description: row.description,
      price: Number(row.price),
      point: row.point ? Number(row.point) : null,
    };

    const gameOdds = oddsMap.get(odds.game_id) || [];
    gameOdds.push(odds);
    oddsMap.set(odds.game_id, gameOdds);
  });

  return Array.from(oddsMap.entries()).map(([_, odds]) => processGameOdds(odds));
}

function processGameOdds(odds: GameOdds[]): ProcessedGameOdds {
  const firstOdd = odds[0];
  const processed: ProcessedGameOdds = {
    game_id: firstOdd.game_id,
    commence_time: firstOdd.commence_time,
    in_play: firstOdd.in_play,
    bookmaker: firstOdd.bookmaker,
    last_update: firstOdd.last_update,
    home_team: firstOdd.home_team,
    away_team: firstOdd.away_team,
    markets: {
      h2h: { home: 0, away: 0 },
      spreads: {
        home: { price: 0, point: 0 },
        away: { price: 0, point: 0 },
      },
      totals: {
        over: { price: 0, point: 0 },
        under: { price: 0, point: 0 },
      },
      player_props: {},
    },
  };

  odds.forEach(odd => {
    switch (odd.market) {
      case 'h2h':
        if (odd.label === processed.home_team) {
          processed.markets.h2h.home = odd.price;
        } else {
          processed.markets.h2h.away = odd.price;
        }
        break;

      case 'spreads':
        if (odd.label === processed.home_team) {
          processed.markets.spreads.home = { price: odd.price, point: odd.point! };
        } else {
          processed.markets.spreads.away = { price: odd.price, point: odd.point! };
        }
        break;

      case 'totals':
        if (odd.label === 'Over') {
          processed.markets.totals.over = { price: odd.price, point: odd.point! };
        } else {
          processed.markets.totals.under = { price: odd.price, point: odd.point! };
        }
        break;

      default:
        if (odd.market.startsWith('player_')) {
          const market = odd.market.replace('player_', '');
          const player = odd.description;

          if (!processed.markets.player_props[player]) {
            processed.markets.player_props[player] = {};
          }
          if (!processed.markets.player_props[player][market]) {
            processed.markets.player_props[player][market] = {
              over: { price: 0, point: 0 },
              under: { price: 0, point: 0 },
            };
          }

          if (odd.label === 'Over') {
            processed.markets.player_props[player][market].over = {
              price: odd.price,
              point: odd.point!,
            };
          } else {
            processed.markets.player_props[player][market].under = {
              price: odd.price,
              point: odd.point!,
            };
          }
        }
    }
  });

  return processed;
}