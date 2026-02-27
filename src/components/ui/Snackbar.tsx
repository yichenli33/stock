import React, { useEffect } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUIStore } from '../../store/useUIStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

const { width } = Dimensions.get('window');

const TYPE_COLORS = {
  success: COLORS.positive,
  error: COLORS.negative,
  info: COLORS.accent,
};

export default function Snackbar() {
  const { snackbar, hideSnackbar } = useUIStore();
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (snackbar.visible) {
      translateY.value = withTiming(0, { duration: 250 });
      opacity.value = withTiming(1, { duration: 250 });

      // Auto-hide after 3s
      const timer = setTimeout(() => {
        translateY.value = withTiming(100, { duration: 250 });
        opacity.value = withTiming(0, { duration: 250 });
        setTimeout(hideSnackbar, 260);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      translateY.value = withTiming(100, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [snackbar.visible, snackbar.message]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const color = TYPE_COLORS[snackbar.type] ?? COLORS.accent;

  return (
    <Animated.View
      style={[
        styles.container,
        { bottom: insets.bottom + 90, borderColor: color + '40' },
        animatedStyle,
      ]}
      pointerEvents="none"
    >
      <Text style={[styles.dot, { color }]}>●</Text>
      <Text style={styles.message}>{snackbar.message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: SPACING['2xl'],
    right: SPACING['2xl'],
    backgroundColor: COLORS.bgCardElevated,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 999,
  },
  dot: { fontSize: 10 },
  message: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.medium,
    flex: 1,
  },
});
