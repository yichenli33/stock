import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, PanResponder } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

const SLIDER_WIDTH = Dimensions.get('window').width - SPACING['2xl'] * 2;
const THUMB_SIZE = 28;

interface RiskSliderProps {
  value: number; // 0–100
  onChange: (value: number) => void;
}

export default function RiskSlider({ value, onChange }: RiskSliderProps) {
  const thumbX = useSharedValue((value / 100) * (SLIDER_WIDTH - THUMB_SIZE));

  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

  const updateValue = (x: number) => {
    const clamped = clamp(x, 0, SLIDER_WIDTH - THUMB_SIZE);
    const pct = Math.round((clamped / (SLIDER_WIDTH - THUMB_SIZE)) * 100);
    onChange(pct);
  };

  const pan = Gesture.Pan()
    .onBegin(() => {})
    .onUpdate((e) => {
      const initial = (value / 100) * (SLIDER_WIDTH - THUMB_SIZE);
      const newX = clamp(initial + e.translationX, 0, SLIDER_WIDTH - THUMB_SIZE);
      thumbX.value = newX;
      runOnJS(updateValue)(newX);
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbX.value }],
  }));

  const fillWidth = (value / 100) * SLIDER_WIDTH;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <LinearGradient
          colors={[COLORS.positive, COLORS.accent, COLORS.negative]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.trackFill, { width: SLIDER_WIDTH }]}
        />
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.thumb, thumbStyle]} />
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SLIDER_WIDTH,
    paddingVertical: SPACING.base,
    alignSelf: 'center',
  },
  track: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.full,
    position: 'relative',
    justifyContent: 'center',
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 8,
    borderRadius: RADIUS.full,
  },
  thumb: {
    position: 'absolute',
    top: -(THUMB_SIZE / 2 - 4),
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.textPrimary,
    borderWidth: 3,
    borderColor: COLORS.accent,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
});
