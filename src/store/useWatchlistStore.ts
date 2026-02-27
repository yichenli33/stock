import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WatchlistEntry } from '../types/watchlist';
import { Stock } from '../types/stock';

interface WatchlistStore {
  entries: WatchlistEntry[];
  addToWatchlist: (stock: Stock) => void;
  removeFromWatchlist: (ticker: string) => void;
  isInWatchlist: (ticker: string) => boolean;
  clearWatchlist: () => void;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      entries: [],

      addToWatchlist: (stock) => {
        const { entries } = get();
        if (entries.some((e) => e.stock.ticker === stock.ticker)) return;
        const entry: WatchlistEntry = {
          stock,
          addedAt: new Date().toISOString(),
        };
        set({ entries: [entry, ...entries] });
      },

      removeFromWatchlist: (ticker) => {
        set({ entries: get().entries.filter((e) => e.stock.ticker !== ticker) });
      },

      isInWatchlist: (ticker) => {
        return get().entries.some((e) => e.stock.ticker === ticker);
      },

      clearWatchlist: () => set({ entries: [] }),
    }),
    {
      name: 'watchlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
