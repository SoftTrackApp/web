import classes from './board-page.module.css';
import { BoardEntity } from '@/entities/board';
import { CreateBoardDialog } from '@/features/board';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export function BoardPage() {
  const board = useSelector(BoardEntity.selectors.selectBoard);

  const navigate = useNavigate();

  if (!board) {
    return <CreateBoardDialog onClose={() => navigate('/')} />;
  }

  return (
    <div className={classes.wrapper}>
      <section className={classes.sideSection}></section>

      <section className={classes.middleSection}></section>

      <section className={classes.sideSection}></section>
    </div>
  );
}
