import { PricePoint } from '../types/stock';

/**
 * Seeded pseudo-random number generator (mulberry32)
 */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Generates 90 days of price history using a seeded random walk.
 */
function generatePriceSeries(
  ticker: string,
  startPrice: number,
  days: number = 90,
  volatility: number = 0.015,
  trend: number = 0.0003,
): PricePoint[] {
  const rand = seededRandom(simpleHash(ticker));
  const result: PricePoint[] = [];
  let price = startPrice;

  const endDate = new Date('2026-02-27');
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days + 1);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];

    // Skip weekends (simple approximation)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    // Random walk: daily return = trend + volatility * normal_approx
    // Box-Muller transform for normal distribution approx
    const u1 = rand();
    const u2 = rand();
    const normal = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const dailyReturn = trend + volatility * normal;
    price = price * (1 + dailyReturn);

    result.push({ date: dateStr, price: Math.round(price * 100) / 100 });
  }

  return result;
}

// Pre-generate price history for all mock stocks
export const PRICE_HISTORY: Record<string, PricePoint[]> = {
  NVDA: generatePriceSeries('NVDA', 580, 90, 0.028, 0.0018),
  MSFT: generatePriceSeries('MSFT', 368, 90, 0.014, 0.0006),
  META: generatePriceSeries('META', 378, 90, 0.022, 0.0016),
  GOOGL: generatePriceSeries('GOOGL', 152, 90, 0.016, 0.001),
  AMD: generatePriceSeries('AMD', 154, 90, 0.026, 0.00085),
  LLY: generatePriceSeries('LLY', 548, 90, 0.024, 0.002),
  UNH: generatePriceSeries('UNH', 470, 90, 0.012, 0.0004),
  ABBV: generatePriceSeries('ABBV', 158, 90, 0.014, 0.0009),
  DXCM: generatePriceSeries('DXCM', 54, 90, 0.025, 0.0018),
  XOM: generatePriceSeries('XOM', 105, 90, 0.013, 0.0005),
  NEE: generatePriceSeries('NEE', 63, 90, 0.015, 0.0009),
  CVX: generatePriceSeries('CVX', 142, 90, 0.014, 0.0007),
  JPM: generatePriceSeries('JPM', 193, 90, 0.016, 0.0011),
  V: generatePriceSeries('V', 268, 90, 0.013, 0.0008),
  'BRK.B': generatePriceSeries('BRK.B', 420, 90, 0.011, 0.0006),
  COIN: generatePriceSeries('COIN', 127, 90, 0.045, 0.0028),
  AMZN: generatePriceSeries('AMZN', 170, 90, 0.018, 0.0014),
  TSLA: generatePriceSeries('TSLA', 252, 90, 0.038, 0.0015),
  COST: generatePriceSeries('COST', 782, 90, 0.013, 0.001),
  SBUX: generatePriceSeries('SBUX', 76, 90, 0.02, 0.0018),
};

/**
 * Get price data sliced to a given timeframe.
 * '1W' → last 7 data points, '1M' → last 30, '3M' → all
 */
export function getPriceDataForTimeframe(
  ticker: string,
  timeframe: '1W' | '1M' | '3M',
): PricePoint[] {
  const history = PRICE_HISTORY[ticker] ?? [];
  if (timeframe === '1W') return history.slice(-5); // ~5 trading days
  if (timeframe === '1M') return history.slice(-22); // ~22 trading days
  return history; // 3M = all ~65 trading days
}
