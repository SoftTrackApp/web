import { CreateBoard } from './create-board';
import { Board } from './board';
import { useSelector } from 'react-redux';
import { BoardFeature } from '@/features/board';

export function BoardPage() {
  const board = useSelector(BoardFeature.selectors.selectBoard);

  return !board ? <CreateBoard /> : <Board />;
}
