import classes from './board-page.module.css';
import { BoardEntity } from '@/entities/board';
import type { User } from '@/entities/user';
import { CreateBoardDialog } from '@/features/board';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { UsersSidebar } from './users-sidebar';
import { EmptyUserState } from './empty-user-state';
import { UserDetails } from './user-details';
import { BehaviorsSidebar } from './behaviors-sidebar';
import { DragDropProvider } from '@dnd-kit/react';

export function BoardPage() {
  const navigate = useNavigate();

  const board = useSelector(BoardEntity.selectors.selectBoard);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dragging, setDragging] = useState(false);

  if (!board) {
    return <CreateBoardDialog onClose={() => navigate('/')} />;
  }

  return (
    <DragDropProvider onDragStart={() => setDragging(true)} onDragEnd={() => setDragging(false)}>
      <div className={classes.wrapper}>
        <title>Доска оценивания - SoftTrack</title>

        <UsersSidebar board={board} selectedUser={selectedUser} onUserSelect={setSelectedUser} />

        {selectedUser ? (
          <UserDetails board={board} user={selectedUser} dragging={dragging} />
        ) : (
          <EmptyUserState />
        )}

        <BehaviorsSidebar board={board} />
      </div>
    </DragDropProvider>
  );
}
