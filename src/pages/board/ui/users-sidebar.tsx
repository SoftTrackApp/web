import clsx from 'clsx';
import classes from './users-sidebar.module.css';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import type { User } from '@/entities/user';
import type { Board } from '@/entities/board';

interface UsersSidebarProps {
  board: Board;
  selectedUser: User | null;
  onUserSelect: (u: User) => void;
}

export function UsersSidebar({ board, selectedUser, onUserSelect }: UsersSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const users = useMemo(() => {
    if (!board) return [];

    const q = searchQuery.trim().toLowerCase();

    return board.users.filter((u) => `${u.fName} ${u.lName}`.toLowerCase().includes(q));
  }, [board, searchQuery]);

  return (
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
        {users.map((u) => (
          <div
            key={u.id}
            className={clsx(
              classes.userItem,
              u.id === selectedUser?.id && classes.userItemSelected,
            )}
            onClick={() => onUserSelect(u)}
            role="listitem"
          >
            {u.fName} {u.lName}
          </div>
        ))}
      </div>
    </section>
  );
}
