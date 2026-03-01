import { CategoryId } from '../constants/categories';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface KnowledgeCard {
  id: string;
  title: string;
  category: CategoryId;
  teaser: string;
  explanation: string;
  example: string;
  funFact: string;
  relatedConcepts: string[];
  tags: string[];
  difficulty: Difficulty;
  accentColor: string;
}

export interface NoteEntry {
  id: string;
  card: KnowledgeCard;
  savedAt: string; // ISO date string
}
