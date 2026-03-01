import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Difficulty } from '../../types/knowledge';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface LevelConfig {
  level: Difficulty;
  label: string;
  emoji: string;
  description: string;
  color: string;
}

const LEVELS: LevelConfig[] = [
  {
    level: 'beginner',
    label: 'Beginner',
    emoji: '🌱',
    description: 'New to the topic — clear explanations, no jargon.',
    color: COLORS.positive,
  },
  {
    level: 'intermediate',
    label: 'Intermediate',
    emoji: '📖',
    description: 'Some background — ready for nuance and detail.',
    color: COLORS.accent,
  },
  {
    level: 'advanced',
    label: 'Advanced',
    emoji: '🎓',
    description: 'Strong foundation — bring the depth and complexity.',
    color: '#A78BFA',
  },
];

interface LevelSelectorProps {
  selected: Difficulty;
  onSelect: (level: Difficulty) => void;
}

export default function LevelSelector({ selected, onSelect }: LevelSelectorProps) {
  return (
    <View style={styles.container}>
      {LEVELS.map((item) => {
        const isSelected = selected === item.level;
        return (
          <TouchableOpacity
            key={item.level}
            style={[
              styles.card,
              isSelected && { borderColor: item.color, borderWidth: 2 },
            ]}
            onPress={() => onSelect(item.level)}
            activeOpacity={0.8}
          >
            {isSelected && (
              <LinearGradient
                colors={[item.color + '30', item.color + '10']}
                style={StyleSheet.absoluteFillObject}
              />
            )}
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={styles.cardText}>
              <Text style={[styles.label, isSelected && { color: item.color }]}>
                {item.label}
              </Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            {isSelected && (
              <View style={[styles.checkmark, { backgroundColor: item.color }]}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    position: 'relative',
  },
  emoji: { fontSize: 28 },
  cardText: { flex: 1, gap: 2 },
  label: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.sm * 1.4,
  },
  checkmark: {
    width: 22,
    height: 22,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: TYPOGRAPHY.xs,
    color: '#fff',
    fontWeight: TYPOGRAPHY.bold,
  },
});
