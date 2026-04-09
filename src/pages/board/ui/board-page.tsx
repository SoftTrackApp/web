import { CreateBoard } from './create-board';
import { Board } from './board';
import { useSelector } from 'react-redux';
import { BoardEntity } from '@/entities/board';

export function BoardPage() {
  const board = useSelector(BoardEntity.selectors.selectBoard);

  return !board ? <CreateBoard /> : <Board />;
}
