import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { usePreferencesStore } from '../../store/usePreferencesStore';
import { useNotesStore } from '../../store/useNotesStore';
import { useUIStore } from '../../store/useUIStore';
import Divider from '../../components/ui/Divider';
import { COLORS, GRADIENTS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface SettingRowProps {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
  destructive?: boolean;
  rightElement?: React.ReactNode;
}

function SettingRow({ icon, label, value, onPress, destructive, rightElement }: SettingRowProps) {
  return (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <Text style={[styles.settingLabel, destructive && { color: COLORS.negative }]}>
          {label}
        </Text>
      </View>
      {rightElement ?? (
        <View style={styles.settingRight}>
          {value && <Text style={styles.settingValue}>{value}</Text>}
          {onPress && <Text style={styles.chevron}>›</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const { selectedCategories, learningLevel, resetPreferences } = usePreferencesStore();
  const { entries, clearNotes } = useNotesStore();
  const { showSnackbar } = useUIStore();

  const levelLabel =
    learningLevel === 'beginner'
      ? 'Beginner'
      : learningLevel === 'intermediate'
      ? 'Intermediate'
      : 'Advanced';

  const handleResetOnboarding = () => {
    Alert.alert(
      'Reset Onboarding',
      'This will clear your preferences and show the onboarding flow again. Your notes will be preserved.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetPreferences();
            showSnackbar('Preferences reset. Restart the app to see onboarding.', 'info');
          },
        },
      ],
    );
  };

  const handleClearNotes = () => {
    if (entries.length === 0) {
      showSnackbar('Your notes are already empty', 'info');
      return;
    }
    Alert.alert(
      'Clear Notes',
      `Remove all ${entries.length} saved concept${entries.length !== 1 ? 's' : ''}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            clearNotes();
            showSnackbar('Notes cleared', 'info');
          },
        },
      ],
    );
  };

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
          </View>

          {/* Preferences section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>PREFERENCES</Text>
            <View style={styles.sectionCard}>
              <SettingRow
                icon="📂"
                label="Categories"
                value={
                  selectedCategories.length === 0
                    ? 'All categories'
                    : `${selectedCategories.length} selected`
                }
              />
              <Divider style={{ marginVertical: 0, marginHorizontal: SPACING.base }} />
              <SettingRow icon="🎓" label="Learning Level" value={levelLabel} />
            </View>
          </View>

          {/* Notes section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>MY NOTES</Text>
            <View style={styles.sectionCard}>
              <SettingRow
                icon="📝"
                label="Saved Concepts"
                value={`${entries.length} concept${entries.length !== 1 ? 's' : ''}`}
              />
              <Divider style={{ marginVertical: 0, marginHorizontal: SPACING.base }} />
              <SettingRow
                icon="🗑️"
                label="Clear Notes"
                onPress={handleClearNotes}
                destructive
              />
            </View>
          </View>

          {/* App section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>APP</Text>
            <View style={styles.sectionCard}>
              <SettingRow
                icon="🔄"
                label="Reset Onboarding"
                onPress={handleResetOnboarding}
                destructive
              />
            </View>
          </View>

          {/* About section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>ABOUT</Text>
            <View style={styles.sectionCard}>
              <SettingRow icon="ℹ️" label="Version" value="1.0.0" />
              <Divider style={{ marginVertical: 0, marginHorizontal: SPACING.base }} />
              <SettingRow icon="📋" label="Content" value="Curated mock data" />
            </View>
          </View>

          {/* About text */}
          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              📚 Daily Knowledge surfaces one new concept per day across Technology, Science, History, Philosophy, Economics, Psychology, Mathematics, and Art & Culture.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  header: {
    paddingHorizontal: SPACING['2xl'],
    paddingTop: SPACING.base,
    paddingBottom: SPACING.xl,
  },
  title: {
    fontSize: TYPOGRAPHY['3xl'],
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    fontSize: TYPOGRAPHY.xs,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textTertiary,
    letterSpacing: 1.5,
    paddingHorizontal: SPACING['2xl'],
    marginBottom: SPACING.sm,
  },
  sectionCard: {
    marginHorizontal: SPACING['2xl'],
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.base,
    minHeight: 52,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  settingIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  settingLabel: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.medium,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  settingValue: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.textSecondary,
  },
  chevron: {
    fontSize: TYPOGRAPHY.xl,
    color: COLORS.textTertiary,
    lineHeight: 20,
  },
  disclaimer: {
    marginHorizontal: SPACING['2xl'],
    marginBottom: SPACING['3xl'],
    padding: SPACING.base,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  disclaimerText: {
    fontSize: TYPOGRAPHY.xs,
    color: COLORS.textTertiary,
    lineHeight: TYPOGRAPHY.xs * 1.6,
  },
});
