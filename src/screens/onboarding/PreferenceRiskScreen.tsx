import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { usePreferencesStore } from '../../store/usePreferencesStore';
import RiskSlider from '../../components/onboarding/RiskSlider';
import Button from '../../components/ui/Button';
import { COLORS, GRADIENTS, SPACING, TYPOGRAPHY, RADIUS } from '../../constants/theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'PreferenceRisk'>;

function getRiskLabel(value: number): { label: string; description: string; color: string } {
  if (value < 30) return {
    label: 'Conservative',
    description: 'Low-volatility, dividend-paying stocks with stable earnings.',
    color: COLORS.positive,
  };
  if (value < 70) return {
    label: 'Balanced',
    description: 'Mix of growth and value stocks across multiple sectors.',
    color: COLORS.accent,
  };
  return {
    label: 'Aggressive',
    description: 'High-growth, emerging opportunities with higher volatility.',
    color: COLORS.negative,
  };
}

export default function PreferenceRiskScreen({ navigation }: Props) {
  const { riskTolerance, setRiskTolerance, setOnboardingComplete } = usePreferencesStore();
  const risk = getRiskLabel(riskTolerance);

  const handleComplete = () => {
    setOnboardingComplete(true);
  };

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.step}>Step 2 of 2</Text>
          <Text style={styles.title}>What's your risk tolerance?</Text>
          <Text style={styles.subtitle}>
            This helps us match recommendations to your investment style.
          </Text>
        </View>

        <View style={styles.content}>
          {/* Risk indicator */}
          <View style={[styles.riskBadge, { borderColor: risk.color }]}>
            <Text style={[styles.riskLabel, { color: risk.color }]}>{risk.label}</Text>
            <Text style={styles.riskDescription}>{risk.description}</Text>
          </View>

          <RiskSlider
            value={riskTolerance}
            onChange={setRiskTolerance}
          />

          {/* Risk profiles */}
          <View style={styles.profiles}>
            <ProfileLabel label="Conservative" position="left" color={COLORS.positive} />
            <ProfileLabel label="Balanced" position="center" color={COLORS.accent} />
            <ProfileLabel label="Aggressive" position="right" color={COLORS.negative} />
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label="Start Discovering"
            onPress={handleComplete}
            variant="primary"
            size="large"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function ProfileLabel({
  label,
  position,
  color,
}: {
  label: string;
  position: 'left' | 'center' | 'right';
  color: string;
}) {
  return (
    <Text
      style={[
        styles.profileLabel,
        { color },
        position === 'left' && { textAlign: 'left' },
        position === 'center' && { textAlign: 'center', flex: 1 },
        position === 'right' && { textAlign: 'right' },
      ]}
    >
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  header: {
    paddingHorizontal: SPACING['2xl'],
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  step: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.semibold,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: TYPOGRAPHY['3xl'],
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.base * TYPOGRAPHY.normal,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING['2xl'],
    paddingTop: SPACING['2xl'],
    gap: SPACING['2xl'],
  },
  riskBadge: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  riskLabel: {
    fontSize: TYPOGRAPHY['2xl'],
    fontWeight: TYPOGRAPHY.bold,
  },
  riskDescription: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.base * TYPOGRAPHY.normal,
  },
  profiles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.sm,
  },
  profileLabel: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.semibold,
  },
  footer: {
    padding: SPACING['2xl'],
    paddingBottom: SPACING['3xl'],
  },
});
