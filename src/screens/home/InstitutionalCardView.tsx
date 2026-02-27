import React from 'react';
import { useCardStore } from '../../store/useCardStore';
import { useUIStore } from '../../store/useUIStore';
import StockCard from '../../components/card/StockCard';

interface InstitutionalCardViewProps {
  hasResponded: boolean;
  onDecision: (decision: 'interested' | 'not_interested') => void;
}

export default function InstitutionalCardView({ hasResponded, onDecision }: InstitutionalCardViewProps) {
  const { institutionalStock, selectedTimeframe, setTimeframe } = useCardStore();
  const { isInstitutionalCardFlipped, setInstitutionalFlipped } = useUIStore();

  return (
    <StockCard
      stock={institutionalStock}
      type="institutional"
      timeframe={selectedTimeframe}
      isFlipped={isInstitutionalCardFlipped}
      onFlipChange={setInstitutionalFlipped}
      onTimeframeChange={setTimeframe}
      onDecision={onDecision}
      hasResponded={hasResponded}
    />
  );
}
