import { SectorId } from '../constants/sectors';

export interface UserPreferences {
  onboardingComplete: boolean;
  selectedSectors: SectorId[];
  riskTolerance: number; // 0–100 slider value
}
