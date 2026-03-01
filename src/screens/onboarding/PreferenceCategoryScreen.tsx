import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { CATEGORIES, CategoryId } from '../../constants/categories';
import { usePreferencesStore } from '../../store/usePreferencesStore';
import Button from '../../components/ui/Button';
import { COLORS, GRADIENTS, SPACING, TYPOGRAPHY, RADIUS } from '../../constants/theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'PreferenceCategory'>;

export default function PreferenceCategoryScreen({ navigation }: Props) {
  const { selectedCategories, toggleCategory } = usePreferencesStore();

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.step}>Step 1 of 2</Text>
          <Text style={styles.title}>What topics interest you?</Text>
          <Text style={styles.subtitle}>
            We'll prioritise these in your daily concepts. You can change this anytime.
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategories.includes(cat.id as CategoryId);
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryCard, isSelected && { borderColor: cat.accentColor, borderWidth: 2 }]}
                onPress={() => toggleCategory(cat.id as CategoryId)}
                activeOpacity={0.8}
              >
                {isSelected && (
                  <LinearGradient
                    colors={[cat.accentColor + '30', cat.accentColor + '10']}
                    style={StyleSheet.absoluteFillObject}
                  />
                )}
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                <Text style={[styles.categoryLabel, isSelected && { color: cat.accentColor }]}>
                  {cat.label}
                </Text>
                {isSelected && (
                  <View style={[styles.checkmark, { backgroundColor: cat.accentColor }]}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <Button
            label={selectedCategories.length === 0 ? 'Skip' : `Continue (${selectedCategories.length} selected)`}
            onPress={() => navigation.navigate('PreferenceLevel')}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.base,
    gap: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  categoryCard: {
    width: '44%',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryEmoji: { fontSize: 32, marginBottom: SPACING.sm },
  categoryLabel: {
    fontSize: TYPOGRAPHY.sm,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 20,
    height: 20,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: TYPOGRAPHY.xs,
    color: '#fff',
    fontWeight: TYPOGRAPHY.bold,
  },
  footer: {
    padding: SPACING['2xl'],
    paddingBottom: SPACING['3xl'],
  },
});
