import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useWatchlistStore } from '../../store/useWatchlistStore';
import { useWatchlist } from '../../hooks/useWatchlist';
import WatchlistItem from '../../components/watchlist/WatchlistItem';
import WatchlistEmpty from '../../components/watchlist/WatchlistEmpty';
import { COLORS, GRADIENTS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { WatchlistEntry } from '../../types/watchlist';

export default function WatchlistScreen() {
  const { entries } = useWatchlistStore();
  const { removeFromWatchlist } = useWatchlist();

  const renderItem = ({ item, index }: { item: WatchlistEntry; index: number }) => (
    <WatchlistItem
      entry={item}
      index={index}
      onRemove={(ticker) => removeFromWatchlist(item.stock)}
    />
  );

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Watchlist</Text>
          <Text style={styles.subtitle}>
            {entries.length === 0
              ? 'No stocks yet'
              : `${entries.length} stock${entries.length !== 1 ? 's' : ''}`}
          </Text>
        </View>

        {/* List */}
        {entries.length === 0 ? (
          <WatchlistEmpty />
        ) : (
          <FlatList
            data={entries}
            keyExtractor={(item) => item.stock.ticker}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  subtitle: {
    fontSize: TYPOGRAPHY.base,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  listContent: {
    paddingBottom: SPACING['3xl'],
  },
});
