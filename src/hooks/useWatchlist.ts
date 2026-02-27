import { useWatchlistStore } from '../store/useWatchlistStore';
import { useUIStore } from '../store/useUIStore';
import { Stock } from '../types/stock';

export function useWatchlist() {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
  const { showSnackbar } = useUIStore();

  const addWithFeedback = (stock: Stock) => {
    if (isInWatchlist(stock.ticker)) {
      showSnackbar(`${stock.ticker} is already in your watchlist`, 'info');
      return;
    }
    addToWatchlist(stock);
    showSnackbar(`${stock.ticker} added to watchlist ⭐`, 'success');
  };

  const removeWithFeedback = (stock: Stock) => {
    removeFromWatchlist(stock.ticker);
    showSnackbar(`${stock.ticker} removed from watchlist`, 'info');
  };

  return {
    addToWatchlist: addWithFeedback,
    removeFromWatchlist: removeWithFeedback,
    isInWatchlist,
  };
}
