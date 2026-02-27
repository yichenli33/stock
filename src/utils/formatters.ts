/**
 * Format a price value as currency string.
 */
export function formatPrice(price: number): string {
  if (price >= 1000) {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${price.toFixed(2)}`;
}

/**
 * Format a percentage change with sign.
 */
export function formatPercent(pct: number): string {
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(2)}%`;
}

/**
 * Format a market cap in billions/trillions.
 */
export function formatMarketCap(billions: number): string {
  if (billions >= 1000) {
    return `$${(billions / 1000).toFixed(2)}T`;
  }
  return `$${billions.toFixed(0)}B`;
}

/**
 * Format a large number (shares) with K/M/B suffix.
 */
export function formatShares(shares: number): string {
  if (shares >= 1_000_000_000) return `${(shares / 1_000_000_000).toFixed(1)}B`;
  if (shares >= 1_000_000) return `${(shares / 1_000_000).toFixed(0)}M`;
  if (shares >= 1_000) return `${(shares / 1_000).toFixed(0)}K`;
  return shares.toString();
}

/**
 * Format an ISO date string to a readable label.
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Format a score (0–100) as a string with label.
 */
export function formatScore(score: number): string {
  return score.toString();
}
