import { useAppSelector } from '@/app/store';
import { CreateBoard } from './create-board';
import { Board } from './board';

export function BoardPage() {
  const board = useAppSelector((state) => state.board.board);

  return !board ? <CreateBoard /> : <Board />;
}
