import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NoteEntry, KnowledgeCard } from '../types/knowledge';

interface NotesStore {
  entries: NoteEntry[];

  addNote: (card: KnowledgeCard) => void;
  removeNote: (id: string) => void;
  isInNotes: (id: string) => boolean;
  clearNotes: () => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      entries: [],

      addNote: (card) => {
        const { entries } = get();
        if (entries.some((e) => e.card.id === card.id)) return;
        const entry: NoteEntry = {
          id: `${card.id}-${Date.now()}`,
          card,
          savedAt: new Date().toISOString(),
        };
        set({ entries: [entry, ...entries] });
      },

      removeNote: (id) => {
        set((state) => ({ entries: state.entries.filter((e) => e.id !== id) }));
      },

      isInNotes: (id) => get().entries.some((e) => e.card.id === id),

      clearNotes: () => set({ entries: [] }),
    }),
    {
      name: 'notes-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
