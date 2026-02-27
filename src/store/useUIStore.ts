import { create } from 'zustand';

export type ActiveTab = 'home' | 'watchlist' | 'settings';

interface SnackbarConfig {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

interface UIStore {
  activeTab: ActiveTab;
  snackbar: SnackbarConfig;
  isProprietaryCardFlipped: boolean;
  isInstitutionalCardFlipped: boolean;

  setActiveTab: (tab: ActiveTab) => void;
  showSnackbar: (message: string, type?: SnackbarConfig['type']) => void;
  hideSnackbar: () => void;
  setProprietaryFlipped: (flipped: boolean) => void;
  setInstitutionalFlipped: (flipped: boolean) => void;
  resetFlips: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  activeTab: 'home',
  snackbar: { message: '', type: 'success', visible: false },
  isProprietaryCardFlipped: false,
  isInstitutionalCardFlipped: false,

  setActiveTab: (tab) => set({ activeTab: tab }),

  showSnackbar: (message, type = 'success') =>
    set({ snackbar: { message, type, visible: true } }),

  hideSnackbar: () =>
    set((state) => ({ snackbar: { ...state.snackbar, visible: false } })),

  setProprietaryFlipped: (flipped) => set({ isProprietaryCardFlipped: flipped }),

  setInstitutionalFlipped: (flipped) => set({ isInstitutionalCardFlipped: flipped }),

  resetFlips: () =>
    set({ isProprietaryCardFlipped: false, isInstitutionalCardFlipped: false }),
}));
