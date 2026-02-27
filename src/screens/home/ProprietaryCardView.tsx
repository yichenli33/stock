import React from 'react';
import { useCardStore } from '../../store/useCardStore';
import { useUIStore } from '../../store/useUIStore';
import { useWatchlist } from '../../hooks/useWatchlist';
import StockCard from '../../components/card/StockCard';

interface ProprietaryCardViewProps {
  hasResponded: boolean;
  onDecision: (decision: 'interested' | 'not_interested') => void;
}

export default function ProprietaryCardView({ hasResponded, onDecision }: ProprietaryCardViewProps) {
  const { proprietaryStock, selectedTimeframe, setTimeframe } = useCardStore();
  const { isProprietaryCardFlipped, setProprietaryFlipped } = useUIStore();

  return (
    <StockCard
      stock={proprietaryStock}
      type="proprietary"
      timeframe={selectedTimeframe}
      isFlipped={isProprietaryCardFlipped}
      onFlipChange={setProprietaryFlipped}
      onTimeframeChange={setTimeframe}
      onDecision={onDecision}
      hasResponded={hasResponded}
    />
  );
}
