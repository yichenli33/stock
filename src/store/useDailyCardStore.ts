import { create } from 'zustand';
import { KnowledgeCard } from '../types/knowledge';
import { getDailyCard, getTodayISO } from '../data/seeds';

type CardResponse = 'interested' | 'not_interested' | null;

interface DailyCardStore {
  todayDate: string;
  todayCard: KnowledgeCard;
  response: CardResponse;

  setResponse: (response: CardResponse) => void;
  refreshDailyCard: () => void;
}

export const useDailyCardStore = create<DailyCardStore>((set) => ({
  todayDate: getTodayISO(),
  todayCard: getDailyCard(),
  response: null,

  setResponse: (response) => set({ response }),

  refreshDailyCard: () => {
    const date = getTodayISO();
    set({ todayDate: date, todayCard: getDailyCard(date), response: null });
  },
}));
