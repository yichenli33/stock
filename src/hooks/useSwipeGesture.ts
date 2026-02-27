import { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS, interpolate, Extrapolation } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { CONFIG } from '../constants/config';

type SwipeDecision = 'interested' | 'not_interested';

interface UseSwipeGestureOptions {
  onDecision: (decision: SwipeDecision) => void;
  disabled?: boolean;
}

export function useSwipeGesture({ onDecision, disabled = false }: UseSwipeGestureOptions) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const crossedThreshold = useSharedValue(false);

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const triggerDecision = (decision: SwipeDecision) => {
    onDecision(decision);
  };

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY * 0.1; // slight vertical movement

      // Trigger haptic when crossing threshold
      const wasOver = crossedThreshold.value;
      const isOver = Math.abs(e.translationX) > CONFIG.SWIPE_THRESHOLD;
      if (isOver && !wasOver) {
        crossedThreshold.value = true;
        runOnJS(triggerHaptic)();
      } else if (!isOver && wasOver) {
        crossedThreshold.value = false;
      }
    })
    .onEnd((e) => {
      const { translationX, velocityX } = e;

      // Determine if we should commit
      const shouldCommit =
        Math.abs(translationX) > CONFIG.SWIPE_THRESHOLD ||
        Math.abs(velocityX) > 800;

      if (shouldCommit) {
        const direction = translationX > 0 ? 1 : -1;
        const flyDistance = CONFIG.SWIPE_FLY_DISTANCE * direction;

        translateX.value = withTiming(flyDistance, { duration: 250 });
        opacity.value = withTiming(0, { duration: 200 });

        const decision: SwipeDecision =
          direction === 1 ? 'interested' : 'not_interested';
        runOnJS(triggerDecision)(decision);
      } else {
        // Snap back
        translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
        translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
        crossedThreshold.value = false;
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      [-CONFIG.SWIPE_THRESHOLD * 2, 0, CONFIG.SWIPE_THRESHOLD * 2],
      [-15, 0, 15],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const interestedOverlayStyle = useAnimatedStyle(() => {
    const overlayOpacity = interpolate(
      translateX.value,
      [0, CONFIG.SWIPE_THRESHOLD],
      [0, 0.9],
      Extrapolation.CLAMP,
    );
    return { opacity: overlayOpacity };
  });

  const notInterestedOverlayStyle = useAnimatedStyle(() => {
    const overlayOpacity = interpolate(
      translateX.value,
      [-CONFIG.SWIPE_THRESHOLD, 0],
      [0.9, 0],
      Extrapolation.CLAMP,
    );
    return { opacity: overlayOpacity };
  });

  const resetCard = () => {
    translateX.value = 0;
    translateY.value = 0;
    opacity.value = 1;
    crossedThreshold.value = false;
  };

  return {
    panGesture,
    cardStyle,
    interestedOverlayStyle,
    notInterestedOverlayStyle,
    resetCard,
  };
}
