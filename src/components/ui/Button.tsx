import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS, SPACING, TYPOGRAPHY, ANIMATION } from '../../constants/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = true,
  style,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, ANIMATION.spring);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, ANIMATION.spring);
  };

  const isGradient = variant === 'primary' || variant === 'success' || variant === 'danger';
  const gradientColors =
    variant === 'success'
      ? GRADIENTS.positive
      : variant === 'danger'
      ? GRADIENTS.negative
      : GRADIENTS.accent;

  const sizeStyle = SIZE_STYLES[size];
  const variantTextStyle = VARIANT_TEXT_STYLES[variant];

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1}
      style={[
        styles.base,
        sizeStyle.container,
        !isGradient && VARIANT_CONTAINER_STYLES[variant],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
    >
      {isGradient ? (
        <LinearGradient
          colors={disabled ? ['#333', '#444'] : gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, sizeStyle.container]}
        >
          <Text style={[styles.label, sizeStyle.text, variantTextStyle]}>{label}</Text>
        </LinearGradient>
      ) : (
        <Text style={[styles.label, sizeStyle.text, variantTextStyle]}>{label}</Text>
      )}
    </AnimatedTouchable>
  );
}

const SIZE_STYLES: Record<string, { container: ViewStyle; text: TextStyle }> = {
  small: {
    container: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.base, minHeight: 36 },
    text: { fontSize: TYPOGRAPHY.sm },
  },
  medium: {
    container: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.xl, minHeight: 48 },
    text: { fontSize: TYPOGRAPHY.base },
  },
  large: {
    container: { paddingVertical: SPACING.base, paddingHorizontal: SPACING['2xl'], minHeight: 56 },
    text: { fontSize: TYPOGRAPHY.lg },
  },
};

const VARIANT_CONTAINER_STYLES: Record<string, ViewStyle> = {
  secondary: { backgroundColor: COLORS.bgCardElevated },
  outline: { borderWidth: 1, borderColor: COLORS.border },
  ghost: { backgroundColor: 'transparent' },
};

const VARIANT_TEXT_STYLES: Record<string, TextStyle> = {
  primary: { color: COLORS.textPrimary },
  secondary: { color: COLORS.textPrimary },
  outline: { color: COLORS.textSecondary },
  ghost: { color: COLORS.textSecondary },
  success: { color: COLORS.textPrimary },
  danger: { color: COLORS.textPrimary },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { width: '100%' },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  label: {
    fontWeight: TYPOGRAPHY.semibold,
    textAlign: 'center',
  },
  disabled: { opacity: 0.5 },
});
