import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NoteEntry } from '../../types/knowledge';
import { getCategoryById } from '../../constants/categories';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface NoteItemProps {
  entry: NoteEntry;
  onRemove: (id: string) => void;
}

export default function NoteItem({ entry, onRemove }: NoteItemProps) {
  const [expanded, setExpanded] = useState(false);
  const { card, savedAt } = entry;
  const category = getCategoryById(card.category);
  const savedDate = new Date(savedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded((prev) => !prev)}
        activeOpacity={0.8}
      >
        <View style={[styles.categoryDot, { backgroundColor: card.accentColor }]} />
        <View style={styles.headerText}>
          <Text style={styles.title}>{card.title}</Text>
          <Text style={styles.meta}>
            {category.emoji} {category.label} · {savedDate}
          </Text>
        </View>
        <Text style={styles.chevron}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.teaser}>{card.teaser}</Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemove(entry.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.removeText}>Remove from Notes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginHorizontal: SPACING['2xl'],
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.base,
    gap: SPACING.md,
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    flexShrink: 0,
  },
  headerText: { flex: 1, gap: 2 },
  title: {
    fontSize: TYPOGRAPHY.base,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textPrimary,
  },
  meta: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textTertiary,
  },
  chevron: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textTertiary,
  },
  expandedContent: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.base,
    gap: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  teaser: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.sm * 1.6,
  },
  removeButton: {
    alignSelf: 'flex-start',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.negative + '15',
    borderWidth: 1,
    borderColor: COLORS.negative + '40',
  },
  removeText: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.negative,
    fontWeight: TYPOGRAPHY.semibold,
  },
});
