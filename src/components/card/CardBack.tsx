import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stock } from '../../types/stock';
import { RecommendationType } from '../../types/stock';
import Divider from '../ui/Divider';
import { COLORS, GRADIENTS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface CardBackProps {
  stock: Stock;
  type: RecommendationType;
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.scoreRow}>
      <Text style={styles.scoreLabel}>{label}</Text>
      <View style={styles.scoreBarTrack}>
        <View style={[styles.scoreBarFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.scoreValue, { color }]}>{value}</Text>
    </View>
  );
}

export default function CardBack({ stock, type }: CardBackProps) {
  const isProprietary = type === 'proprietary';
  const accentColor = stock.accentColor;

  return (
    <LinearGradient colors={GRADIENTS.cardPremium} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.ticker}>{stock.ticker}</Text>
          <View style={[styles.typeBadge, { backgroundColor: accentColor + '20' }]}>
            <Text style={[styles.typeLabel, { color: accentColor }]}>
              {isProprietary ? '⚡ Proprietary' : '🏛 Institutional'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Company description */}
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{stock.description}</Text>

        <Divider />

        {/* Why recommended */}
        <Text style={styles.sectionTitle}>Why Recommended</Text>
        <Text style={styles.whyText}>
          {isProprietary ? stock.whyRecommendedProprietary : stock.whyRecommendedInstitutional}
        </Text>

        <Divider />

        {isProprietary ? (
          <>
            {/* Proprietary Score Breakdown */}
            <View style={styles.scoreSection}>
              <View style={styles.scoreTotalRow}>
                <Text style={styles.sectionTitle}>Performance Score</Text>
                <View style={[styles.totalScoreBadge, { backgroundColor: accentColor }]}>
                  <Text style={styles.totalScoreText}>{stock.proprietaryScore.total}</Text>
                </View>
              </View>
              <ScoreBar label="Momentum" value={stock.proprietaryScore.momentum} color={COLORS.positive} />
              <ScoreBar label="Fundamentals" value={stock.proprietaryScore.fundamentals} color={COLORS.accent} />
              <ScoreBar label="Trend" value={stock.proprietaryScore.trend} color={COLORS.accentLight} />
              <ScoreBar label="Low Volatility" value={stock.proprietaryScore.volatility} color={COLORS.financials} />
              <ScoreBar label="Sentiment" value={stock.proprietaryScore.sentiment} color={COLORS.consumer} />
            </View>
          </>
        ) : (
          <>
            {/* Institutional holders */}
            <Text style={styles.sectionTitle}>Key Institutional Holders</Text>
            <View style={styles.holdersSection}>
              {stock.institutionalHolders.slice(0, 3).map((holder, i) => (
                <View key={i} style={styles.holderRow}>
                  <View style={styles.holderLeft}>
                    <Text style={styles.holderIndex}>{i + 1}</Text>
                    <Text style={styles.holderName}>{holder.name}</Text>
                  </View>
                  <Text style={[styles.holderPct, { color: accentColor }]}>
                    {holder.holdingPercent.toFixed(1)}%
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Risk badge */}
        <View style={styles.riskRow}>
          <Text style={styles.riskLabel}>Risk Level:</Text>
          <View style={[styles.riskBadge, { backgroundColor: riskColor(stock.riskLevel) + '20' }]}>
            <Text style={[styles.riskText, { color: riskColor(stock.riskLevel) }]}>
              {stock.riskLevel.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Back flip hint */}
        <Text style={styles.flipHint}>← Tap card to go back</Text>
      </ScrollView>
    </LinearGradient>
  );
}

function riskColor(level: string): string {
  if (level === 'low') return COLORS.positive;
  if (level === 'medium') return COLORS.accent;
  return COLORS.negative;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: RADIUS['2xl'],
    padding: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.base,
  },
  headerLeft: { gap: SPACING.xs },
  ticker: {
    fontSize: TYPOGRAPHY['2xl'],
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  typeBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
  },
  typeLabel: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.semibold,
  },
  scrollContent: { gap: SPACING.sm, paddingBottom: SPACING.base },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.sm * 1.6,
  },
  whyText: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.sm * 1.6,
  },
  scoreSection: { gap: SPACING.sm },
  scoreTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  totalScoreBadge: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalScoreText: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  scoreLabel: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textSecondary,
    width: 80,
  },
  scoreBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: RADIUS.full,
  },
  scoreValue: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.bold,
    width: 28,
    textAlign: 'right',
  },
  holdersSection: { gap: SPACING.md },
  holderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
  holderLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, flex: 1 },
  holderIndex: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textTertiary,
    width: 16,
    textAlign: 'center',
  },
  holderName: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textPrimary,
    flex: 1,
  },
  holderPct: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.bold,
  },
  riskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  riskLabel: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
  },
  riskBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  riskText: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.bold,
  },
  flipHint: {
    textAlign: 'center',
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textTertiary,
    fontStyle: 'italic',
    marginTop: SPACING.sm,
  },
});
