import { MOCK_KNOWLEDGE_CARDS } from './mockKnowledgeCards';
import { KnowledgeCard } from '../types/knowledge';

/**
 * Simple hash of a string → integer
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Returns today's date as an ISO string (YYYY-MM-DD).
 */
export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Returns the daily knowledge card for a given date.
 * The same date always returns the same card (deterministic).
 */
export function getDailyCard(dateISO: string = getTodayISO()): KnowledgeCard {
  const hash = hashString(dateISO + '-daily');
  const index = hash % MOCK_KNOWLEDGE_CARDS.length;
  return MOCK_KNOWLEDGE_CARDS[index];
}
