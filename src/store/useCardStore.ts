import { create } from 'zustand';
import { Stock, CardResponse, SelectedTimeframe } from '../types/stock';
import { getDailyProprietaryStock, getDailyInstitutionalStock, getTodayISO } from '../data/seeds';
import { CONFIG } from '../constants/config';

interface CardStore {
  // State
  todayDate: string;
  proprietaryStock: Stock;
  institutionalStock: Stock;
  proprietaryResponse: CardResponse | null;
  institutionalResponse: CardResponse | null;
  selectedTimeframe: SelectedTimeframe;

  // Actions
  respondProprietary: (response: 'interested' | 'not_interested') => CardResponse;
  respondInstitutional: (response: 'interested' | 'not_interested') => CardResponse;
  setTimeframe: (timeframe: SelectedTimeframe) => void;
  refreshDailyCards: () => void;
}

export const useCardStore = create<CardStore>((set, get) => ({
  todayDate: getTodayISO(),
  proprietaryStock: getDailyProprietaryStock(),
  institutionalStock: getDailyInstitutionalStock(),
  proprietaryResponse: null,
  institutionalResponse: null,
  selectedTimeframe: CONFIG.DEFAULT_TIMEFRAME,

  respondProprietary: (response) => {
    const { proprietaryStock, todayDate } = get();
    const cardResponse: CardResponse = {
      ticker: proprietaryStock.ticker,
      type: 'proprietary',
      response,
      respondedAt: new Date().toISOString(),
    };
    set({ proprietaryResponse: cardResponse });
    return cardResponse;
  },

  respondInstitutional: (response) => {
    const { institutionalStock } = get();
    const cardResponse: CardResponse = {
      ticker: institutionalStock.ticker,
      type: 'institutional',
      response,
      respondedAt: new Date().toISOString(),
    };
    set({ institutionalResponse: cardResponse });
    return cardResponse;
  },

  setTimeframe: (timeframe) => set({ selectedTimeframe: timeframe }),

  refreshDailyCards: () => {
    const today = getTodayISO();
    set({
      todayDate: today,
      proprietaryStock: getDailyProprietaryStock(today),
      institutionalStock: getDailyInstitutionalStock(today),
      proprietaryResponse: null,
      institutionalResponse: null,
    });
  },
}));
