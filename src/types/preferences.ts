import { CategoryId } from '../constants/categories';
import { Difficulty } from './knowledge';

export interface UserPreferences {
  onboardingComplete: boolean;
  selectedCategories: CategoryId[];
  learningLevel: Difficulty;
}
