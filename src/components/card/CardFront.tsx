import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stock } from '../../types/stock';
import { Timeframe } from '../../constants/config';
import PriceLineChart from '../chart/PriceLineChart';
import TimeframeSelector from '../chart/TimeframeSelector';
import Tag from '../ui/Tag';
import { getPriceDataForTimeframe } from '../../data/mockPriceHistory';
import { formatPrice, formatPercent, formatMarketCap } from '../../utils/formatters';
import { colorForChange } from '../../utils/colorForChange';
import { COLORS, GRADIENTS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.88;

interface CardFrontProps {
  stock: Stock;
  timeframe: Timeframe;
  onTimeframeChange: (tf: Timeframe) => void;
  onFlipHint?: () => void;
}

export default function CardFront({
  stock,
  timeframe,
  onTimeframeChange,
}: CardFrontProps) {
  const priceData = getPriceDataForTimeframe(stock.ticker, timeframe);
  const changeColor = colorForChange(stock.priceChange1DPercent);
  const changeForTimeframe =
    timeframe === '1W'
      ? stock.priceChange1W
      : timeframe === '1M'
      ? stock.priceChange1M
      : stock.priceChange3M;

  return (
    <LinearGradient colors={GRADIENTS.card} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoPlaceholder}>
          <LinearGradient
            colors={[stock.accentColor + '80', stock.accentColor + '40']}
            style={styles.logoGradient}
          >
            <Text style={styles.logoText}>{stock.logoInitials}</Text>
          </LinearGradient>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.ticker}>{stock.ticker}</Text>
          <Text style={styles.companyName} numberOfLines={1}>
            {stock.companyName}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(stock.currentPrice)}</Text>
          <View style={[styles.changeBadge, { backgroundColor: changeColor + '20' }]}>
            <Text style={[styles.changeText, { color: changeColor }]}>
              {formatPercent(stock.priceChange1DPercent)}
            </Text>
          </View>
        </View>
      </View>

      {/* Sector tag + market cap */}
      <View style={styles.metaRow}>
        <Tag label={stock.sector.toUpperCase()} color={stock.accentColor} />
        <Text style={styles.marketCap}>Mkt Cap {formatMarketCap(stock.marketCap)}</Text>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <PriceLineChart
          data={priceData}
          width={CARD_WIDTH - SPACING.xl * 2}
          height={110}
          color={changeForTimeframe >= 0 ? COLORS.positive : COLORS.negative}
        />
      </View>

      {/* Timeframe selector */}
      <View style={styles.timeframeRow}>
        <TimeframeSelector
          selected={timeframe}
          onChange={onTimeframeChange}
          accentColor={stock.accentColor}
        />
        <Text style={styles.periodChange}>
          <Text style={{ color: colorForChange(changeForTimeframe) }}>
            {formatPercent(changeForTimeframe)}
          </Text>
          <Text style={styles.periodLabel}> ({timeframe})</Text>
        </Text>
      </View>

      {/* Tags */}
      <View style={styles.tagsRow}>
        {stock.tags.slice(0, 3).map((tag) => (
          <Tag key={tag} label={tag} color={stock.accentColor} />
        ))}
      </View>

      {/* Flip hint */}
      <View style={styles.flipHint}>
        <Text style={styles.flipHintText}>Tap card to see why it's recommended →</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: RADIUS['2xl'],
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  logoPlaceholder: {
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  logoGradient: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
  },
  logoText: {
    fontSize: TYPOGRAPHY.md,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },
  headerInfo: { flex: 1 },
  ticker: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },
  companyName: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
  },
  priceContainer: { alignItems: 'flex-end', gap: 4 },
  price: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  changeBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  changeText: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.semibold,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marketCap: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textTertiary,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },
  timeframeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  periodChange: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
  },
  periodLabel: {
    color: COLORS.textTertiary,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  flipHint: {
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  flipHintText: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textTertiary,
    fontStyle: 'italic',
  },
});
