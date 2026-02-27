import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SECTORS, SectorId } from '../../constants/sectors';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface SectorGridProps {
  selectedSectors: SectorId[];
  onToggle: (sectorId: SectorId) => void;
}

export default function SectorGrid({ selectedSectors, onToggle }: SectorGridProps) {
  return (
    <View style={styles.grid}>
      {SECTORS.map((sector) => {
        const isSelected = selectedSectors.includes(sector.id as SectorId);
        return (
          <TouchableOpacity
            key={sector.id}
            style={[styles.cell, isSelected && { borderColor: sector.color, borderWidth: 2 }]}
            onPress={() => onToggle(sector.id as SectorId)}
            activeOpacity={0.8}
          >
            {isSelected && (
              <LinearGradient
                colors={[sector.color + '30', sector.color + '10']}
                style={StyleSheet.absoluteFillObject}
              />
            )}
            <Text style={styles.emoji}>{sector.emoji}</Text>
            <Text style={[styles.label, isSelected && { color: sector.color }]}>
              {sector.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  cell: {
    width: '44%',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  emoji: { fontSize: 28, marginBottom: SPACING.xs },
  label: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
