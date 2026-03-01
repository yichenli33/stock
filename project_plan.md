# Daily Knowledge — Product Requirements Document

## Overview

Daily Knowledge is a mobile learning app that surfaces one new concept per day across
domains like Technology, Science, History, Economics, and more. Users swipe to save
concepts they want to revisit in My Notes, and flip the card to explore a deep-dive
explanation with examples.

---

## Core Experience

- One knowledge card per day, revealed at midnight (deterministic by date hash)
- **Front:** Category badge, concept title, 1–2 sentence teaser, difficulty chip, tags
- **Back** (tap to flip): Full explanation, real-world example, fun fact, related concepts
- Swipe right (Save) → saved to My Notes with haptic confirmation + snackbar
- Swipe left (Skip) → dismissed for the day with haptic feedback
- Snackbar confirms save action

---

## Knowledge Card Structure

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique slug |
| `title` | `string` | Concept name |
| `category` | `CategoryId` | One of 8 knowledge domains |
| `difficulty` | `'beginner' \| 'intermediate' \| 'advanced'` | Complexity level |
| `teaser` | `string` | 1–2 sentence hook shown on card front |
| `explanation` | `string` | 2–3 paragraph deep-dive shown on card back |
| `example` | `string` | Real-world illustration |
| `funFact` | `string` | Surprising or memorable detail |
| `relatedConcepts` | `string[]` | 2–3 linked terms shown as tag chips |
| `tags` | `string[]` | Additional labels |
| `accentColor` | `string` | Hex, derived from category |

---

## Categories (8)

| ID | Label | Emoji | Accent |
|---|---|---|---|
| `technology` | Technology | 💻 | #3B82F6 |
| `science` | Science | 🔬 | #10B981 |
| `history` | History | 📜 | #F59E0B |
| `philosophy` | Philosophy | 🧠 | #8B5CF6 |
| `economics` | Economics | 📈 | #06B6D4 |
| `psychology` | Psychology | 🧩 | #EC4899 |
| `mathematics` | Mathematics | ➕ | #F97316 |
| `art` | Art & Culture | 🎨 | #A78BFA |

---

## My Notes

- Persisted list of saved KnowledgeCards (via AsyncStorage + Zustand)
- Shows: concept title, category badge with emoji, date saved
- Tap entry to expand: teaser + "Remove from Notes" button
- Header shows count of saved concepts

---

## Onboarding (3 screens)

1. **Welcome** — App name, tagline, feature highlights, "Get Started" CTA
2. **Category Preferences** — Grid of 8 categories (multi-select, can skip)
3. **Learning Level** — 3-button selector: Beginner / Intermediate / Advanced

---

## Settings

- View selected categories and learning level
- Count of saved concepts + "Clear Notes" action
- "Reset Onboarding" (clears preferences, preserves notes)
- App version info

---

## Technical Stack

| Layer | Technology |
|---|---|
| Runtime | React Native (Expo ~52.0.0) + TypeScript |
| State | Zustand ^5.0.2 + AsyncStorage (persist) |
| Animation | react-native-reanimated ~3.16.1 |
| Gestures | react-native-gesture-handler ~2.20.2 |
| Navigation | @react-navigation native-stack + bottom-tabs |
| Haptics | expo-haptics |
| Gradients | expo-linear-gradient |

---

## File Structure

```
src/
├── components/
│   ├── card/         CardFront, CardBack, StockCard (KnowledgeCardView), CardFlipWrapper
│   ├── notes/        NoteItem, NotesEmpty
│   ├── onboarding/   LevelSelector
│   └── ui/           Button, Divider, GradientBackground, Snackbar, Tag
├── constants/        categories.ts, config.ts, theme.ts
├── data/             mockKnowledgeCards.ts (20 cards), seeds.ts
├── hooks/            useCardFlip.ts, useSwipeGesture.ts
├── navigation/       RootNavigator, MainTabNavigator, OnboardingNavigator, types.ts
├── screens/
│   ├── home/         HomeScreen
│   ├── notes/        NotesScreen
│   ├── onboarding/   WelcomeScreen, PreferenceCategoryScreen, PreferenceLevelScreen
│   └── settings/     SettingsScreen
├── store/            useDailyCardStore, useNotesStore, usePreferencesStore, useUIStore
├── types/            knowledge.ts, preferences.ts
└── utils/            dateHelpers.ts, formatters.ts
```

---

## Non-Functional Requirements

- **Offline-first:** All content bundled as mock data initially
- **Deterministic daily card:** Same date always yields same card (hash-based seed)
- **TypeScript strict:** 0 compile errors at all times
- **Install:** `npm install --legacy-peer-deps` (React peer dep conflict)

---

## Mock Content (20 cards)

| Category | Titles |
|---|---|
| Technology | Moore's Law · Zero-Day Vulnerability · Neural Networks |
| Science | Quantum Entanglement · CRISPR Gene Editing · The Doppler Effect |
| History | The Silk Road · The Black Death · The Space Race |
| Philosophy | Occam's Razor · The Ship of Theseus · Stoicism |
| Economics | Compound Interest · Tragedy of the Commons · Nash Equilibrium |
| Psychology | Cognitive Dissonance · The Dunning-Kruger Effect · Flow State |
| Mathematics | The Fibonacci Sequence · Bayes' Theorem |
| Art & Culture | The Golden Ratio |
