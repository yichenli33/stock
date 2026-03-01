import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { KnowledgeCard } from '../../types/knowledge';
import CardFlipWrapper from './CardFlipWrapper';
import CardFront from './CardFront';
import CardBack from './CardBack';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import { COLORS, RADIUS, TYPOGRAPHY, SPACING, SHADOWS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.88;
const CARD_HEIGHT = CARD_WIDTH * 1.42;

interface KnowledgeCardProps {
  card: KnowledgeCard;
  isFlipped: boolean;
  onFlipChange: (flipped: boolean) => void;
  onDecision: (decision: 'interested' | 'not_interested') => void;
  hasResponded: boolean;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
}

export default function KnowledgeCardView({
  card,
  isFlipped,
  onFlipChange,
  onDecision,
  hasResponded,
  isSpeaking,
  onToggleSpeech,
}: KnowledgeCardProps) {
  const { panGesture, cardStyle, interestedOverlayStyle, notInterestedOverlayStyle } =
    useSwipeGesture({
      onDecision,
      disabled: hasResponded || isFlipped,
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.cardWrapper, SHADOWS.card, cardStyle]}>
        {/* Save overlay (green, right swipe) */}
        <Animated.View
          style={[styles.overlay, styles.interestedOverlay, interestedOverlayStyle]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={['transparent', COLORS.positive + '60']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFillObject}
          />
          <Text style={[styles.overlayLabel, { color: COLORS.positive }]}>SAVE ⭐</Text>
        </Animated.View>

        {/* Skip overlay (red, left swipe) */}
        <Animated.View
          style={[styles.overlay, styles.notInterestedOverlay, notInterestedOverlayStyle]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={[COLORS.negative + '60', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFillObject}
          />
          <Text style={[styles.overlayLabel, { color: COLORS.negative }]}>SKIP ✗</Text>
        </Animated.View>

        <CardFlipWrapper
          isFlipped={isFlipped}
          onFlipChange={onFlipChange}
          front={<CardFront card={card} isSpeaking={isSpeaking} onToggleSpeech={onToggleSpeech} />}
          back={<CardBack card={card} isSpeaking={isSpeaking} onToggleSpeech={onToggleSpeech} />}
        />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    borderRadius: RADIUS['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  interestedOverlay: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: SPACING.xl,
  },
  notInterestedOverlay: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: SPACING.xl,
  },
  overlayLabel: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.extrabold,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: SPACING.xl,
  },
});
