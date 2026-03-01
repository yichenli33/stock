import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { KnowledgeCard } from '../../types/knowledge';
import { getCategoryById } from '../../constants/categories';
import Tag from '../ui/Tag';
import Divider from '../ui/Divider';
import { COLORS, GRADIENTS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface CardBackProps {
  card: KnowledgeCard;
}

export default function CardBack({ card }: CardBackProps) {
  const category = getCategoryById(card.category);

  return (
    <LinearGradient colors={GRADIENTS.cardPremium} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.categoryHeader, { color: card.accentColor }]}>
          {category.emoji} {category.label}
        </Text>
        <Text style={styles.cardTitle}>{card.title}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Explanation */}
        <Text style={styles.sectionTitle}>Explanation</Text>
        <Text style={styles.bodyText}>{card.explanation}</Text>

        <Divider />

        {/* Example */}
        <Text style={styles.sectionTitle}>Example</Text>
        <View style={[styles.highlightBox, { borderLeftColor: card.accentColor }]}>
          <Text style={styles.highlightText}>{card.example}</Text>
        </View>

        <Divider />

        {/* Fun Fact */}
        <Text style={styles.sectionTitle}>Fun Fact</Text>
        <View style={styles.funFactRow}>
          <Text style={styles.funFactIcon}>💡</Text>
          <Text style={styles.bodyText}>{card.funFact}</Text>
        </View>

        <Divider />

        {/* Related Concepts */}
        <Text style={styles.sectionTitle}>Related Concepts</Text>
        <View style={styles.tagsRow}>
          {card.relatedConcepts.map((concept) => (
            <Tag key={concept} label={concept} color={card.accentColor} />
          ))}
        </View>

        {/* Back flip hint */}
        <Text style={styles.flipHint}>← Tap card to go back</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: RADIUS['2xl'],
    padding: SPACING.xl,
  },
  header: {
    gap: SPACING.xs,
    marginBottom: SPACING.base,
  },
  categoryHeader: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY['2xl'],
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  scrollContent: {
    gap: SPACING.sm,
    paddingBottom: SPACING.base,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  bodyText: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.sm * 1.6,
    flex: 1,
  },
  highlightBox: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    borderLeftWidth: 3,
    padding: SPACING.md,
  },
  highlightText: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.sm * 1.6,
    fontStyle: 'italic',
  },
  funFactRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    alignItems: 'flex-start',
  },
  funFactIcon: {
    fontSize: 18,
    lineHeight: TYPOGRAPHY.sm * 1.6,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  flipHint: {
    textAlign: 'center',
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textTertiary,
    fontStyle: 'italic',
    marginTop: SPACING.md,
  },
});
