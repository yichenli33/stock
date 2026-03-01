import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { KnowledgeCard } from '../../types/knowledge';
import { getCategoryById } from '../../constants/categories';
import Tag from '../ui/Tag';
import { COLORS, GRADIENTS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface CardFrontProps {
  card: KnowledgeCard;
}

const DIFFICULTY_LABEL: Record<KnowledgeCard['difficulty'], string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const DIFFICULTY_COLOR: Record<KnowledgeCard['difficulty'], string> = {
  beginner: COLORS.positive,
  intermediate: COLORS.accent,
  advanced: COLORS.negative,
};

export default function CardFront({ card }: CardFrontProps) {
  const category = getCategoryById(card.category);
  const difficultyColor = DIFFICULTY_COLOR[card.difficulty];

  return (
    <LinearGradient colors={GRADIENTS.card} style={styles.container}>
      {/* Top row: category badge + difficulty chip */}
      <View style={styles.topRow}>
        <View style={[styles.categoryBadge, { backgroundColor: card.accentColor + '25', borderColor: card.accentColor + '60' }]}>
          <Text style={styles.categoryEmoji}>{category.emoji}</Text>
          <Text style={[styles.categoryLabel, { color: card.accentColor }]}>{category.label}</Text>
        </View>
        <View style={[styles.difficultyChip, { backgroundColor: difficultyColor + '20', borderColor: difficultyColor + '50' }]}>
          <Text style={[styles.difficultyText, { color: difficultyColor }]}>
            {DIFFICULTY_LABEL[card.difficulty]}
          </Text>
        </View>
      </View>

      {/* Concept title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{card.title}</Text>
      </View>

      {/* Teaser */}
      <Text style={styles.teaser}>{card.teaser}</Text>

      {/* Tags */}
      <View style={styles.tagsRow}>
        {card.tags.slice(0, 3).map((tag) => (
          <Tag key={tag} label={tag} color={card.accentColor} />
        ))}
      </View>

      {/* Flip hint */}
      <View style={styles.flipHint}>
        <Text style={styles.flipHintText}>Tap card to learn more →</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: RADIUS['2xl'],
    padding: SPACING.xl,
    gap: SPACING.lg,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  categoryEmoji: {
    fontSize: 16,
  },
  categoryLabel: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
  },
  difficultyChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  difficultyText: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  titleContainer: {
    marginVertical: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY['3xl'],
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    lineHeight: TYPOGRAPHY['3xl'] * 1.2,
    textAlign: 'center',
  },
  teaser: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.base * 1.6,
    textAlign: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    justifyContent: 'center',
  },
  flipHint: {
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  flipHintText: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textTertiary,
    fontStyle: 'italic',
  },
});
