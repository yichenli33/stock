import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { usePreferencesStore } from '../../store/usePreferencesStore';
import LevelSelector from '../../components/onboarding/LevelSelector';
import Button from '../../components/ui/Button';
import { Difficulty } from '../../types/knowledge';
import { COLORS, GRADIENTS, SPACING, TYPOGRAPHY } from '../../constants/theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'PreferenceLevel'>;

export default function PreferenceLevelScreen({ navigation }: Props) {
  const { learningLevel, setLearningLevel, setOnboardingComplete } = usePreferencesStore();

  const handleComplete = () => {
    setOnboardingComplete(true);
  };

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.step}>Step 2 of 2</Text>
          <Text style={styles.title}>What's your learning level?</Text>
          <Text style={styles.subtitle}>
            We'll tailor difficulty to match your background.
          </Text>
        </View>

        <View style={styles.content}>
          <LevelSelector
            selected={learningLevel}
            onSelect={(level: Difficulty) => setLearningLevel(level)}
          />
        </View>

        <View style={styles.footer}>
          <Button
            label="Start Learning"
            onPress={handleComplete}
            variant="primary"
            size="large"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
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
  },
  footer: {
    padding: SPACING['2xl'],
    paddingBottom: SPACING['3xl'],
  },
});
