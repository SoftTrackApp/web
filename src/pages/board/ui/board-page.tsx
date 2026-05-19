import classes from './board-page.module.css';
import { BoardEntity } from '@/entities/board';
import { CreateBoardDialog } from '@/features/board';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { UsersSidebar } from './users-sidebar';
import { EmptyUserState } from './empty-user-state';
import { UserDetails } from './user-details';
import { BehaviorsSidebar } from './behaviors-sidebar';
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { BehaviorSetEntity } from '@/entities/behavior-set';

export function BoardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const board = useSelector(BoardEntity.selectors.selectBoard);
  const behaviorSets = useSelector(BehaviorSetEntity.selectors.selectBehaviorSets);

  // TODO: make separate behaviors slice
  const behaviors = behaviorSets.data.map((bs) => bs.behaviors).flat();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const selectedUser = useMemo(() => {
    if (!board || !selectedUserId) return null;
    return board.users.find((u) => u.id === selectedUserId) ?? null;
  }, [board, selectedUserId]);

  const onDragEnd = (e: DragEndEvent) => {
    if (e.canceled) return;

    setDragging(false);

    if (!selectedUser || !board) return;

    const behaviorId = Number(e.operation.source?.id.toString().replace('behavior-', ''));
    const behavior = behaviors.find((b) => b.id === behaviorId);
    if (!behavior) return;

    if (e.operation.target?.id === 'droppable') {
      dispatch(
        BoardEntity.actions.addUserBehavior({
          title: board.name,
          userId: selectedUser.id,
          behavior: behavior,
        }),
      );
    }
  };

  if (!board) {
    return <CreateBoardDialog onClose={() => navigate('/')} />;
  }

  return (
    <DragDropProvider onDragStart={() => setDragging(true)} onDragEnd={onDragEnd}>
      <div className={classes.wrapper}>
        <title>Доска оценивания - SoftTrack</title>

        <UsersSidebar
          board={board}
          selectedUser={selectedUser}
          onUserSelect={(u) => setSelectedUserId(u.id)}
        />

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
