export const SECTORS = [
  { id: 'tech', label: 'Technology', emoji: '💻', color: '#6C63FF' },
  { id: 'healthcare', label: 'Healthcare', emoji: '🏥', color: '#00C896' },
  { id: 'energy', label: 'Energy', emoji: '⚡', color: '#FFB347' },
  { id: 'financials', label: 'Financials', emoji: '🏦', color: '#4FC3F7' },
  { id: 'consumer', label: 'Consumer', emoji: '🛍️', color: '#FF8A80' },
  { id: 'industrials', label: 'Industrials', emoji: '🏭', color: '#B0BEC5' },
  { id: 'realestate', label: 'Real Estate', emoji: '🏠', color: '#FFCC80' },
  { id: 'materials', label: 'Materials', emoji: '⛏️', color: '#A5D6A7' },
  { id: 'utilities', label: 'Utilities', emoji: '💡', color: '#CE93D8' },
  { id: 'telecom', label: 'Telecom', emoji: '📡', color: '#80DEEA' },
] as const;

export type SectorId = (typeof SECTORS)[number]['id'];
