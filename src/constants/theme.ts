export const COLORS = {
  // Background
  bgPrimary: '#0A0A0F',
  bgSecondary: '#13131A',
  bgCard: '#1A1A25',
  bgCardElevated: '#22223A',

  // Accent
  accent: '#6C63FF',
  accentLight: '#8B83FF',
  accentDark: '#4A43CC',

  // Status
  positive: '#00C896',
  positiveLight: '#00E5AB',
  negativeDark: '#FF4560',
  negative: '#FF6B6B',
  negativeLight: '#FF9999',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B8',
  textTertiary: '#606080',
  textMuted: '#3A3A5C',

  // UI
  border: '#2A2A3E',
  borderLight: '#3A3A54',
  overlay: 'rgba(0,0,0,0.6)',
  overlayLight: 'rgba(0,0,0,0.3)',

  // Sector colors
  tech: '#6C63FF',
  healthcare: '#00C896',
  energy: '#FFB347',
  financials: '#4FC3F7',
  consumer: '#FF8A80',

  // Swipe overlays
  swipeRight: 'rgba(0, 200, 150, 0.3)',
  swipeLeft: 'rgba(255, 69, 96, 0.3)',
};

export const GRADIENTS = {
  card: ['#1A1A25', '#22223A'] as const,
  cardPremium: ['#1E1A2E', '#2A1A3E'] as const,
  background: ['#0A0A0F', '#13131A'] as const,
  accent: ['#6C63FF', '#8B83FF'] as const,
  positive: ['#00C896', '#00A878'] as const,
  negative: ['#FF4560', '#CC2040'] as const,
};

export const TYPOGRAPHY = {
  // Font sizes
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,

  // Font weights (as string literals for RN)
  thin: '100' as const,
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,

  // Line heights
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  card: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  flip: 400,
  spring: {
    damping: 20,
    stiffness: 200,
  },
};
