export const CATEGORIES = [
  { id: 'technology', label: 'Technology', emoji: '💻', accentColor: '#3B82F6' },
  { id: 'science', label: 'Science', emoji: '🔬', accentColor: '#10B981' },
  { id: 'history', label: 'History', emoji: '📜', accentColor: '#F59E0B' },
  { id: 'philosophy', label: 'Philosophy', emoji: '🧠', accentColor: '#8B5CF6' },
  { id: 'economics', label: 'Economics', emoji: '📈', accentColor: '#06B6D4' },
  { id: 'psychology', label: 'Psychology', emoji: '🧩', accentColor: '#EC4899' },
  { id: 'mathematics', label: 'Mathematics', emoji: '➕', accentColor: '#F97316' },
  { id: 'art', label: 'Art & Culture', emoji: '🎨', accentColor: '#A78BFA' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

export function getCategoryById(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)!;
}
