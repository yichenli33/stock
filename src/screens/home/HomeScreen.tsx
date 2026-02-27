import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useCardStore } from '../../store/useCardStore';
import { useUIStore } from '../../store/useUIStore';
import { useWatchlist } from '../../hooks/useWatchlist';
import StockCard from '../../components/card/StockCard';
import Button from '../../components/ui/Button';
import { COLORS, GRADIENTS, SPACING, TYPOGRAPHY, RADIUS, ANIMATION } from '../../constants/theme';
import { formatDate } from '../../utils/formatters';
import { getTodayISO } from '../../utils/dateHelpers';

const { width } = Dimensions.get('window');
const TAB_WIDTH = (width - SPACING['2xl'] * 2) / 2;

type HomeTab = 'proprietary' | 'institutional';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<HomeTab>('proprietary');
  const underlineX = useSharedValue(0);

  const {
    proprietaryStock,
    institutionalStock,
    proprietaryResponse,
    institutionalResponse,
    selectedTimeframe,
    respondProprietary,
    respondInstitutional,
    setTimeframe,
  } = useCardStore();

  const {
    isProprietaryCardFlipped,
    isInstitutionalCardFlipped,
    setProprietaryFlipped,
    setInstitutionalFlipped,
    showSnackbar,
  } = useUIStore();

  const { addToWatchlist } = useWatchlist();

  const switchTab = useCallback((tab: HomeTab) => {
    setActiveTab(tab);
    underlineX.value = withTiming(tab === 'proprietary' ? 0 : TAB_WIDTH, {
      duration: ANIMATION.normal,
    });
  }, []);

  const underlineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: underlineX.value }],
  }));

  const isProprietary = activeTab === 'proprietary';
  const stock = isProprietary ? proprietaryStock : institutionalStock;
  const response = isProprietary ? proprietaryResponse : institutionalResponse;
  const isFlipped = isProprietary ? isProprietaryCardFlipped : isInstitutionalCardFlipped;
  const setFlipped = isProprietary ? setProprietaryFlipped : setInstitutionalFlipped;
  const hasResponded = response !== null;

  const handleDecision = useCallback(
    (decision: 'interested' | 'not_interested') => {
      if (isProprietary) {
        respondProprietary(decision);
      } else {
        respondInstitutional(decision);
      }

      if (decision === 'interested') {
        addToWatchlist(stock);
      } else {
        showSnackbar(`${stock.ticker} dismissed`, 'info');
      }
    },
    [isProprietary, stock],
  );

  const handleButtonDecision = (decision: 'interested' | 'not_interested') => {
    handleDecision(decision);
  };

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Today's Pick</Text>
            <Text style={styles.date}>{formatDate(getTodayISO())}</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 Daily</Text>
          </View>
        </View>

        {/* Top Tab Switcher */}
        <View style={styles.tabContainer}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => switchTab('proprietary')}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isProprietary && styles.tabTextActive]}>
                ⚡ Algorithm Pick
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => switchTab('institutional')}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, !isProprietary && styles.tabTextActive]}>
                🏛 Institutional
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.underlineTrack}>
            <Animated.View
              style={[styles.underline, underlineStyle, { backgroundColor: stock.accentColor }]}
            />
          </View>
        </View>

        {/* Card Area */}
        <View style={styles.cardArea}>
          {hasResponded ? (
            <RespondedState
              decision={response!.response}
              ticker={stock.ticker}
            />
          ) : (
            <StockCard
              key={`${activeTab}-${stock.ticker}`}
              stock={stock}
              type={activeTab}
              timeframe={selectedTimeframe}
              isFlipped={isFlipped}
              onFlipChange={setFlipped}
              onTimeframeChange={setTimeframe}
              onDecision={handleDecision}
              hasResponded={hasResponded}
            />
          )}
        </View>

        {/* Action buttons */}
        {!hasResponded && (
          <View style={styles.actionButtons}>
            <Button
              label="✕  Pass"
              onPress={() => handleButtonDecision('not_interested')}
              variant="outline"
              size="large"
              style={styles.passButton}
            />
            <Button
              label="⭐ Interested"
              onPress={() => handleButtonDecision('interested')}
              variant="success"
              size="large"
              style={styles.interestedButton}
            />
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

function RespondedState({
  decision,
  ticker,
}: {
  decision: 'interested' | 'not_interested';
  ticker: string;
}) {
  const isInterested = decision === 'interested';
  return (
    <View style={styles.respondedContainer}>
      <Text style={styles.respondedEmoji}>{isInterested ? '⭐' : '✕'}</Text>
      <Text style={[styles.respondedTitle, { color: isInterested ? COLORS.positive : COLORS.negative }]}>
        {isInterested ? 'Added to Watchlist!' : 'Stock Dismissed'}
      </Text>
      <Text style={styles.respondedSubtitle}>
        {isInterested
          ? `${ticker} has been saved to your watchlist. Check back tomorrow for a new pick!`
          : `You passed on ${ticker}. A new recommendation will appear tomorrow.`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING['2xl'],
    paddingTop: SPACING.base,
    paddingBottom: SPACING.base,
  },
  greeting: {
    fontSize: TYPOGRAPHY['2xl'],
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  date: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  streakBadge: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  streakText: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.medium,
  },
  tabContainer: {
    marginHorizontal: SPACING['2xl'],
    marginBottom: SPACING.base,
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  tabText: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.textTertiary,
  },
  tabTextActive: {
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.semibold,
  },
  underlineTrack: {
    height: 2,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.full,
  },
  underline: {
    height: 2,
    width: TAB_WIDTH,
    borderRadius: RADIUS.full,
  },
  cardArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: SPACING['2xl'],
    paddingBottom: SPACING['2xl'],
    gap: SPACING.md,
  },
  passButton: {
    flex: 1,
  },
  interestedButton: {
    flex: 1.5,
  },
  respondedContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING['2xl'],
    gap: SPACING.base,
  },
  respondedEmoji: { fontSize: 64 },
  respondedTitle: {
    fontSize: TYPOGRAPHY['2xl'],
    fontWeight: TYPOGRAPHY.bold,
    textAlign: 'center',
  },
  respondedSubtitle: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.base * TYPOGRAPHY.normal,
  },
});
