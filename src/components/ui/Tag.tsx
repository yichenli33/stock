import React from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface TagProps {
  label: string;
  color?: string;
  style?: ViewStyle;
}

export default function Tag({ label, color = COLORS.accent, style }: TagProps) {
  return (
    <LinearGradient
      colors={[color + '30', color + '15']}
      style={[styles.container, { borderColor: color + '50' }, style]}
    >
      <Text style={[styles.text, { color }]}>{label}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.semibold,
    letterSpacing: 0.3,
  },
});
