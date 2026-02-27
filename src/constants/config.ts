export const CONFIG = {
  // Swipe
  SWIPE_THRESHOLD: 120,
  SWIPE_FLY_DISTANCE: 400,

  // Card
  CARD_WIDTH_RATIO: 0.88,
  CARD_ASPECT_RATIO: 1.5,

  // Animation
  FLIP_DURATION: 400,
  STAGGER_DELAY: 50,

  // Watchlist
  MAX_WATCHLIST_ITEMS: 50,

  // Chart
  PRICE_HISTORY_DAYS: 90,
  DEFAULT_TIMEFRAME: '1M' as const,
};

export type Timeframe = '1W' | '1M' | '3M';
export const TIMEFRAMES: Timeframe[] = ['1W', '1M', '3M'];
