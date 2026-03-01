import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useCardFlip } from '../../hooks/useCardFlip';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.88;
const CARD_HEIGHT = CARD_WIDTH * 1.42;

interface CardFlipWrapperProps {
  isFlipped: boolean;
  onFlipChange: (flipped: boolean) => void;
  front: React.ReactNode;
  back: React.ReactNode;
}

export default function CardFlipWrapper({
  isFlipped,
  onFlipChange,
  front,
  back,
}: CardFlipWrapperProps) {
  const { flip, frontStyle, backStyle } = useCardFlip(isFlipped, onFlipChange);

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onEnd(() => {
      'worklet';
      runOnJS(flip)();
    });

  return (
    <GestureDetector gesture={tapGesture}>
      <View style={styles.container}>
        {/* Front */}
        <Animated.View style={[styles.card, frontStyle]}>
          {front}
        </Animated.View>
        {/* Back — absolutely positioned on top, rotated 180° to start */}
        <Animated.View style={[styles.card, styles.cardBack, backStyle]}>
          {back}
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cardBack: {
    // Will be hidden by backfaceVisibility: 'hidden' in animated style
  },
});
