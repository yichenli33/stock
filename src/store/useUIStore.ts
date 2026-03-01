import { create } from 'zustand';

export type ActiveTab = 'home' | 'notes' | 'settings';

interface SnackbarConfig {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

interface UIStore {
  activeTab: ActiveTab;
  snackbar: SnackbarConfig;
  isCardFlipped: boolean;

  setActiveTab: (tab: ActiveTab) => void;
  showSnackbar: (message: string, type?: SnackbarConfig['type']) => void;
  hideSnackbar: () => void;
  setIsCardFlipped: (flipped: boolean) => void;
  resetFlip: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  activeTab: 'home',
  snackbar: { message: '', type: 'success', visible: false },
  isCardFlipped: false,

  setActiveTab: (tab) => set({ activeTab: tab }),

  showSnackbar: (message, type = 'success') =>
    set({ snackbar: { message, type, visible: true } }),

  hideSnackbar: () =>
    set((state) => ({ snackbar: { ...state.snackbar, visible: false } })),

  setIsCardFlipped: (flipped) => set({ isCardFlipped: flipped }),

  resetFlip: () => set({ isCardFlipped: false }),
}));
