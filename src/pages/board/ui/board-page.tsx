import { useAppSelector } from '@/app/store';
import { CreateBoard } from './create-board';
import { ControlBoard } from './control-board';

export function BoardPage() {
  const board = useAppSelector((state) => state.board.board);

  return !board ? <CreateBoard /> : <ControlBoard />;
}
