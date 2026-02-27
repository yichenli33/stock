import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { usePreferencesStore } from '../../store/usePreferencesStore';
import { useWatchlistStore } from '../../store/useWatchlistStore';
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
  const { selectedSectors, riskTolerance, resetPreferences } = usePreferencesStore();
  const { entries, clearWatchlist } = useWatchlistStore();
  const { showSnackbar } = useUIStore();

  const handleResetOnboarding = () => {
    Alert.alert(
      'Reset Onboarding',
      'This will clear your preferences and show the onboarding flow again. Your watchlist will be preserved.',
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

  const handleClearWatchlist = () => {
    if (entries.length === 0) {
      showSnackbar('Your watchlist is already empty', 'info');
      return;
    }
    Alert.alert(
      'Clear Watchlist',
      `Remove all ${entries.length} stocks from your watchlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            clearWatchlist();
            showSnackbar('Watchlist cleared', 'info');
          },
        },
      ],
    );
  };

  const riskLabel = riskTolerance < 30 ? 'Conservative' : riskTolerance < 70 ? 'Balanced' : 'Aggressive';

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
          </View>

          {/* Profile section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>PREFERENCES</Text>
            <View style={styles.sectionCard}>
              <SettingRow
                icon="📊"
                label="Sectors"
                value={
                  selectedSectors.length === 0
                    ? 'All sectors'
                    : `${selectedSectors.length} selected`
                }
              />
              <Divider style={{ marginVertical: 0, marginHorizontal: SPACING.base }} />
              <SettingRow icon="⚖️" label="Risk Tolerance" value={riskLabel} />
            </View>
          </View>

          {/* Watchlist section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>WATCHLIST</Text>
            <View style={styles.sectionCard}>
              <SettingRow
                icon="⭐"
                label="Saved Stocks"
                value={`${entries.length} stock${entries.length !== 1 ? 's' : ''}`}
              />
              <Divider style={{ marginVertical: 0, marginHorizontal: SPACING.base }} />
              <SettingRow
                icon="🗑️"
                label="Clear Watchlist"
                onPress={handleClearWatchlist}
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
              <SettingRow icon="ℹ️" label="Version" value="1.0.0 (Skeleton)" />
              <Divider style={{ marginVertical: 0, marginHorizontal: SPACING.base }} />
              <SettingRow icon="📋" label="Data" value="Mock data only" />
            </View>
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              ⚠️ Daily Stock Card is for informational purposes only. All stock picks shown are
              mock data for demonstration. This is not financial advice.
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
