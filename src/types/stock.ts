import { SectorId } from '../constants/sectors';
import { Timeframe } from '../constants/config';

export type RiskLevel = 'low' | 'medium' | 'high';
export type RecommendationType = 'proprietary' | 'institutional';

export interface PricePoint {
  date: string; // ISO date string YYYY-MM-DD
  price: number;
}

export interface InstitutionalHolder {
  name: string;
  holdingPercent: number;
  sharesHeld: number;
}

export interface ProprietaryScore {
  total: number; // 0-100
  momentum: number;
  volatility: number;
  fundamentals: number;
  trend: number;
  sentiment: number;
}

export interface Stock {
  ticker: string;
  companyName: string;
  sector: SectorId;
  industry: string;
  description: string;
  currentPrice: number;
  priceChange1D: number; // absolute
  priceChange1DPercent: number;
  priceChange1W: number;
  priceChange1M: number;
  priceChange3M: number;
  marketCap: number; // in billions
  peRatio: number;
  riskLevel: RiskLevel;
  proprietaryScore: ProprietaryScore;
  institutionalHolders: InstitutionalHolder[];
  whyRecommendedProprietary: string;
  whyRecommendedInstitutional: string;
  tags: string[];
  logoInitials: string; // 2-3 letter abbreviation for placeholder logo
  accentColor: string; // sector-derived accent for card
}

export interface DailyCard {
  proprietaryStock: Stock;
  institutionalStock: Stock;
  date: string; // ISO date
}

export interface CardResponse {
  ticker: string;
  type: RecommendationType;
  response: 'interested' | 'not_interested';
  respondedAt: string;
}

export type SelectedTimeframe = Timeframe;
