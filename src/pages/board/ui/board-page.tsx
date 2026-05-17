import classes from './board-page.module.css';
import { BoardEntity } from '@/entities/board';
import { CreateBoardDialog } from '@/features/board';
import { Input } from '@/shared/ui/input';
import { ChevronLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';

export function BoardPage() {
  const board = useSelector(BoardEntity.selectors.selectBoard);

  const [searchQuery, setSearchQuery] = useState('');

  const users = useMemo(() => {
    if (!board) return [];

    const q = searchQuery.trim().toLowerCase();

    return board.users.filter((u) => `${u.fName} ${u.lName}`.includes(q));
  }, [board, searchQuery]);

  const navigate = useNavigate();

  if (!board) {
    return <CreateBoardDialog onClose={() => navigate('/')} />;
  }

  return (
    <div className={classes.wrapper}>
      <section className={classes.sideSection}>
        <Link to="/" className={classes.homeLink}>
          <ChevronLeft /> Вернуться на Главную
        </Link>

        <Input
          placeholder="Найти"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className={classes.usersList} role="list">
          {users.map((user) => (
            <div key={user.id} className={classes.userItem} role="listitem">
              {user.fName} {user.lName}
            </div>
          ))}
        </div>
      </section>

      <section className={classes.middleSection}></section>

      <section className={classes.sideSection}></section>
    </div>
  );
}
