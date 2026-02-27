import { Stock } from './stock';

export interface WatchlistEntry {
  stock: Stock;
  addedAt: string; // ISO date
  notes?: string;
}
