import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';

interface DividerProps {
  style?: ViewStyle;
  color?: string;
}

export default function Divider({ style, color = COLORS.border }: DividerProps) {
  return <View style={[styles.divider, { backgroundColor: color }, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
    marginVertical: SPACING.base,
  },
});
