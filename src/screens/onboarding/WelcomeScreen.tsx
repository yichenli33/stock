import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import Button from '../../components/ui/Button';
import { COLORS, GRADIENTS, SPACING, TYPOGRAPHY, RADIUS } from '../../constants/theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        {/* Hero area */}
        <View style={styles.hero}>
          <View style={styles.logoContainer}>
            <LinearGradient colors={GRADIENTS.accent} style={styles.logoGradient}>
              <Text style={styles.logoEmoji}>📚</Text>
            </LinearGradient>
          </View>
          <Text style={styles.appName}>Daily Knowledge</Text>
          <Text style={styles.tagline}>One concept. One day. Endlessly curious.</Text>
        </View>

        {/* Feature list */}
        <View style={styles.features}>
          <FeatureRow icon="🧠" text="One curated concept per day across 8 knowledge domains" />
          <FeatureRow icon="💡" text="Flip the card for a deep dive with examples & fun facts" />
          <FeatureRow icon="⭐" text="Save concepts to My Notes with a single swipe" />
          <FeatureRow icon="🎓" text="Tailored difficulty — Beginner to Advanced" />
        </View>

        {/* CTA */}
        <View style={styles.cta}>
          <Button
            label="Get Started"
            onPress={() => navigation.navigate('PreferenceCategory')}
            variant="primary"
            size="large"
          />
          <Text style={styles.disclaimer}>No account required · Free to use</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function FeatureRow({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureRow}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, paddingHorizontal: SPACING['2xl'] },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING['4xl'],
  },
  logoContainer: {
    marginBottom: SPACING.xl,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
  },
  logoGradient: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.xl,
  },
  logoEmoji: { fontSize: 48 },
  appName: {
    fontSize: TYPOGRAPHY['4xl'],
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  tagline: {
    fontSize: TYPOGRAPHY.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.regular,
  },
  features: {
    gap: SPACING.lg,
    paddingVertical: SPACING['2xl'],
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.base,
  },
  featureIcon: { fontSize: 24, width: 36, textAlign: 'center' },
  featureText: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    flex: 1,
  },
  cta: {
    paddingBottom: SPACING['2xl'],
    gap: SPACING.md,
    alignItems: 'center',
  },
  disclaimer: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textTertiary,
  },
});
