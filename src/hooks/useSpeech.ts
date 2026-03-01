import * as Speech from 'expo-speech';
import { useState, useCallback, useEffect } from 'react';
import { KnowledgeCard } from '../types/knowledge';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const stop = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback((card: KnowledgeCard) => {
    const script = buildScript(card);
    Speech.speak(script, {
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
    setIsSpeaking(true);
  }, []);

  const toggle = useCallback(
    (card: KnowledgeCard) => {
      if (isSpeaking) stop();
      else speak(card);
    },
    [isSpeaking, speak, stop],
  );

  // Stop on unmount (e.g. tab switch)
  useEffect(() => () => { Speech.stop(); }, []);

  return { isSpeaking, speak, stop, toggle };
}

function buildScript(card: KnowledgeCard): string {
  return [
    `${card.title}.`,
    card.teaser,
    card.explanation,
    `Example: ${card.example}`,
    `Fun fact: ${card.funFact}`,
    `Related concepts: ${card.relatedConcepts.join(', ')}.`,
  ].join(' ');
}
