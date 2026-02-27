import { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';
import { ANIMATION } from '../constants/theme';

export function useCardFlip(isFlipped: boolean, onFlipChange: (flipped: boolean) => void) {
  const rotation = useSharedValue(isFlipped ? 1 : 0);

  const flip = () => {
    const newValue = rotation.value < 0.5 ? 1 : 0;
    rotation.value = withTiming(newValue, { duration: ANIMATION.flip });
    onFlipChange(newValue === 1);
  };

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 1], [0, 180]);
    return {
      transform: [{ perspective: 1200 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden' as const,
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 1], [180, 360]);
    return {
      transform: [{ perspective: 1200 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden' as const,
    };
  });

  return { flip, frontStyle, backStyle };
}
