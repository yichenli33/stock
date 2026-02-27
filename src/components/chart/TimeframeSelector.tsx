import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { TIMEFRAMES, Timeframe } from '../../constants/config';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, ANIMATION } from '../../constants/theme';

interface TimeframeSelectorProps {
  selected: Timeframe;
  onChange: (tf: Timeframe) => void;
  accentColor?: string;
}

export default function TimeframeSelector({
  selected,
  onChange,
  accentColor = COLORS.accent,
}: TimeframeSelectorProps) {
  return (
    <View style={styles.container}>
      {TIMEFRAMES.map((tf) => {
        const isActive = tf === selected;
        return (
          <TouchableOpacity
            key={tf}
            style={[styles.tab, isActive && { backgroundColor: accentColor + '20' }]}
            onPress={() => onChange(tf)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.label,
                isActive && { color: accentColor, fontWeight: TYPOGRAPHY.semibold },
              ]}
            >
              {tf}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  tab: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
  },
  label: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.textTertiary,
  },
});
