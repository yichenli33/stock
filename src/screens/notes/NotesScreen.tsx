import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNotesStore } from '../../store/useNotesStore';
import NoteItem from '../../components/notes/NoteItem';
import NotesEmpty from '../../components/notes/NotesEmpty';
import { NoteEntry } from '../../types/knowledge';
import { COLORS, GRADIENTS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function NotesScreen() {
  const { entries, removeNote } = useNotesStore();

  const renderItem = ({ item }: { item: NoteEntry }) => (
    <NoteItem entry={item} onRemove={removeNote} />
  );

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Notes</Text>
          <Text style={styles.subtitle}>
            {entries.length === 0
              ? 'No concepts saved yet'
              : `${entries.length} concept${entries.length !== 1 ? 's' : ''} saved`}
          </Text>
        </View>

        {/* List */}
        {entries.length === 0 ? (
          <NotesEmpty />
        ) : (
          <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
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
    paddingTop: SPACING.xs,
    paddingBottom: SPACING['3xl'],
  },
});
