import { COLORS } from '../constants/theme';

export function colorForChange(pct: number): string {
  return pct >= 0 ? COLORS.positive : COLORS.negative;
}

export function bgColorForChange(pct: number): string {
  return pct >= 0 ? COLORS.positive + '20' : COLORS.negative + '20';
}
