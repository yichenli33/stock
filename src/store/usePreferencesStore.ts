import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CategoryId } from '../constants/categories';
import { Difficulty } from '../types/knowledge';

interface PreferencesStore {
  onboardingComplete: boolean;
  selectedCategories: CategoryId[];
  learningLevel: Difficulty;

  setOnboardingComplete: (value: boolean) => void;
  setCategories: (categories: CategoryId[]) => void;
  toggleCategory: (category: CategoryId) => void;
  setLearningLevel: (level: Difficulty) => void;
  resetPreferences: () => void;
}

const INITIAL_STATE = {
  onboardingComplete: false,
  selectedCategories: [] as CategoryId[],
  learningLevel: 'beginner' as Difficulty,
};

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setOnboardingComplete: (value) => set({ onboardingComplete: value }),

      setCategories: (categories) => set({ selectedCategories: categories }),

      toggleCategory: (category) => {
        const { selectedCategories } = get();
        if (selectedCategories.includes(category)) {
          set({ selectedCategories: selectedCategories.filter((c) => c !== category) });
        } else {
          set({ selectedCategories: [...selectedCategories, category] });
        }
      },

      setLearningLevel: (level) => set({ learningLevel: level }),

      resetPreferences: () => set(INITIAL_STATE),
    }),
    {
      name: 'preferences-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
