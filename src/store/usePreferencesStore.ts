import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SectorId } from '../constants/sectors';

interface PreferencesStore {
  onboardingComplete: boolean;
  selectedSectors: SectorId[];
  riskTolerance: number; // 0–100

  setOnboardingComplete: (value: boolean) => void;
  setSectors: (sectors: SectorId[]) => void;
  toggleSector: (sector: SectorId) => void;
  setRiskTolerance: (value: number) => void;
  resetPreferences: () => void;
}

const INITIAL_STATE = {
  onboardingComplete: false,
  selectedSectors: [] as SectorId[],
  riskTolerance: 50,
};

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setOnboardingComplete: (value) => set({ onboardingComplete: value }),

      setSectors: (sectors) => set({ selectedSectors: sectors }),

      toggleSector: (sector) => {
        const { selectedSectors } = get();
        if (selectedSectors.includes(sector)) {
          set({ selectedSectors: selectedSectors.filter((s) => s !== sector) });
        } else {
          set({ selectedSectors: [...selectedSectors, sector] });
        }
      },

      setRiskTolerance: (value) => set({ riskTolerance: value }),

      resetPreferences: () => set(INITIAL_STATE),
    }),
    {
      name: 'preferences-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
