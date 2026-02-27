import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { WatchlistEntry } from '../../types/watchlist';
import PriceLineChart from '../chart/PriceLineChart';
import { getPriceDataForTimeframe } from '../../data/mockPriceHistory';
import { formatPrice, formatPercent } from '../../utils/formatters';
import { colorForChange } from '../../utils/colorForChange';
import { formatRelativeDate } from '../../utils/dateHelpers';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, SHADOWS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CHART_WIDTH = 80;

interface WatchlistItemProps {
  entry: WatchlistEntry;
  index: number;
  onRemove: (ticker: string) => void;
}

export default function WatchlistItem({ entry, index, onRemove }: WatchlistItemProps) {
  const { stock, addedAt } = entry;
  const changeColor = colorForChange(stock.priceChange1DPercent);
  const miniChartData = getPriceDataForTimeframe(stock.ticker, '1M');

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).duration(300)}
      style={[styles.container, SHADOWS.sm]}
    >
      <LinearGradient colors={['#1A1A25', '#16162A']} style={styles.gradient}>
        {/* Left: Logo + Info */}
        <View style={styles.left}>
          <LinearGradient
            colors={[stock.accentColor + '80', stock.accentColor + '40']}
            style={styles.logo}
          >
            <Text style={styles.logoText}>{stock.logoInitials}</Text>
          </LinearGradient>
          <View style={styles.info}>
            <Text style={styles.ticker}>{stock.ticker}</Text>
            <Text style={styles.companyName} numberOfLines={1}>
              {stock.companyName}
            </Text>
            <Text style={styles.addedAt}>Added {formatRelativeDate(addedAt)}</Text>
          </View>
        </View>

        {/* Middle: Mini chart */}
        <View style={styles.chartContainer}>
          <PriceLineChart
            data={miniChartData}
            width={CHART_WIDTH}
            height={44}
            showGradient={false}
          />
        </View>

        {/* Right: Price + Change */}
        <View style={styles.right}>
          <Text style={styles.price}>{formatPrice(stock.currentPrice)}</Text>
          <View style={[styles.changeBadge, { backgroundColor: changeColor + '20' }]}>
            <Text style={[styles.changeText, { color: changeColor }]}>
              {formatPercent(stock.priceChange1DPercent)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => onRemove(stock.ticker)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.removeBtn}>✕</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginHorizontal: SPACING['2xl'],
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#2A2A3E',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    gap: SPACING.sm,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, flex: 1 },
  logo: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  info: { flex: 1 },
  ticker: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  companyName: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textSecondary,
  },
  addedAt: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  price: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  changeBadge: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  changeText: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.semibold,
  },
  removeBtn: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textTertiary,
    marginTop: 4,
  },
});
