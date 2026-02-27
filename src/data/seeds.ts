import { MOCK_STOCKS } from './mockStocks';
import { Stock } from '../types/stock';

/**
 * Simple hash of a string → integer
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Returns today's date as an ISO string (YYYY-MM-DD).
 */
export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Returns the daily proprietary stock pick for a given date.
 * The same date always returns the same stock (deterministic).
 */
export function getDailyProprietaryStock(dateISO: string = getTodayISO()): Stock {
  const hash = hashString(dateISO + '-proprietary');
  const index = hash % MOCK_STOCKS.length;
  return MOCK_STOCKS[index];
}

/**
 * Returns the daily institutional stock pick for a given date.
 * Different from the proprietary pick (uses different salt).
 */
export function getDailyInstitutionalStock(dateISO: string = getTodayISO()): Stock {
  const hash = hashString(dateISO + '-institutional');
  // Ensure it's different from proprietary pick
  const proprietaryHash = hashString(dateISO + '-proprietary');
  let index = hash % MOCK_STOCKS.length;
  if (index === proprietaryHash % MOCK_STOCKS.length) {
    index = (index + 1) % MOCK_STOCKS.length;
  }
  return MOCK_STOCKS[index];
}
