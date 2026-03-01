import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useDailyCardStore } from '../../store/useDailyCardStore';
import { useNotesStore } from '../../store/useNotesStore';
import { useUIStore } from '../../store/useUIStore';
import KnowledgeCardView from '../../components/card/StockCard';
import Button from '../../components/ui/Button';
import { COLORS, GRADIENTS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { formatDate } from '../../utils/formatters';
import { getTodayISO } from '../../utils/dateHelpers';

export default function HomeScreen() {
  const { todayCard, response, setResponse } = useDailyCardStore();
  const { addNote } = useNotesStore();
  const { isCardFlipped, setIsCardFlipped, showSnackbar } = useUIStore();

  const hasResponded = response !== null;

  const handleDecision = useCallback(
    (decision: 'interested' | 'not_interested') => {
      setResponse(decision);
      if (decision === 'interested') {
        addNote(todayCard);
        showSnackbar('Saved to Notes ⭐', 'success');
      } else {
        showSnackbar('Come back tomorrow for a new concept!', 'info');
      }
    },
    [todayCard],
  );

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Today's Concept</Text>
            <Text style={styles.date}>{formatDate(getTodayISO())}</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>📚 Daily</Text>
          </View>
        </View>

        {/* Card Area */}
        <View style={styles.cardArea}>
          {hasResponded ? (
            <RespondedState decision={response!} title={todayCard.title} />
          ) : (
            <KnowledgeCardView
              card={todayCard}
              isFlipped={isCardFlipped}
              onFlipChange={setIsCardFlipped}
              onDecision={handleDecision}
              hasResponded={hasResponded}
            />
          )}
        </View>

        {/* Action buttons */}
        {!hasResponded && (
          <View style={styles.actionButtons}>
            <Button
              label="✕  Skip"
              onPress={() => handleDecision('not_interested')}
              variant="outline"
              size="large"
              style={styles.skipButton}
            />
            <Button
              label="⭐ Save to Notes"
              onPress={() => handleDecision('interested')}
              variant="success"
              size="large"
              style={styles.saveButton}
            />
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

function RespondedState({
  decision,
  title,
}: {
  decision: 'interested' | 'not_interested';
  title: string;
}) {
  const isInterested = decision === 'interested';
  return (
    <View style={styles.respondedContainer}>
      <Text style={styles.respondedEmoji}>{isInterested ? '⭐' : '✓'}</Text>
      <Text style={[styles.respondedTitle, { color: isInterested ? COLORS.positive : COLORS.accent }]}>
        {isInterested ? 'Saved to Notes!' : 'See You Tomorrow!'}
      </Text>
      <Text style={styles.respondedSubtitle}>
        {isInterested
          ? `"${title}" has been saved to your notes. Come back tomorrow for a new concept!`
          : `You skipped "${title}". A new concept will appear tomorrow.`}
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
    borderRadius: 999,
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
  skipButton: {
    flex: 1,
  },
  saveButton: {
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
