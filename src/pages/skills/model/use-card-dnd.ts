import { useEffect, useState } from 'react';
import type { BehaviorSet } from '@/entities/behavior-set';

export function useCardDnd(sets: BehaviorSet[]) {
  const [orderedSets, setOrderedSets] = useState(sets);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  useEffect(() => {
    setOrderedSets(sets);
  }, [sets]);

  const dropCard = (target: number) => {
    if (dragIndex === null) return;

    setOrderedSets((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(target, 0, moved);
      return next;
    });

    setDragIndex(null);
    setOverIndex(null);
  };

  const getCardProps = (index: number) => ({
    isDragged: dragIndex === index,
    isOver: overIndex === index && dragIndex !== index,
    onDragStart: () => setDragIndex(index),
    onDragEnd: () => {
      setDragIndex(null);
      setOverIndex(null);
    },
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      if (dragIndex !== null && index !== dragIndex) setOverIndex(index);
    },
    onDrop: () => dropCard(index),
  });

  return {
    orderedSets,
    getCardProps,
    isDragging: dragIndex !== null,
  };
}
