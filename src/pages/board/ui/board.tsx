import classes from './board.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronUp, Search } from 'lucide-react';
import { Input, Dialog, Button } from '@/shared/ui';
import { UserFeature } from '@/features/user';
import { BoardFeature } from '@/features/board';
import { BehaviorSetFeature } from '@/features/behavior-set';
import { MessageCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { DragDropProvider, useDroppable, type DragEndEvent } from '@dnd-kit/react';
import { BehaviorCard } from './behavior-card';

export function Board() {
  const [searchText, setSearchText] = useState('');
  const [comment, setComment] = useState('');

  const { ref } = useDroppable({ id: 'droppable' });

  const board = useSelector(BoardFeature.selectors.selectBoard);
  const { behaviorSets } = useSelector(BehaviorSetFeature.selectors.selectBehaviorSets);
  const { users, loading, error } = useSelector(UserFeature.selectors.selectUsers);

  const dispatch = useDispatch();

  const filteredUsers = useMemo(() => {
    const query = searchText.toLowerCase();

    return users.filter((u) =>
      (u.name.toLowerCase() + ' ' + u.surname.toLowerCase()).includes(query),
    );
  }, [users, searchText]);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(UserFeature.actions.fetchUsers());
    }
  }, [dispatch, users.length]);

  if (!behaviorSets || !board) {
    return null;
  }

  const behaviorSet = behaviorSets.find((bs) => bs.id === board.behaviorSetId);
  const selectedUser = users.find((u) => u.id === board.selectedUserId);

  const addUserRecord = (behaviorName: string) => {
    if (!selectedUser) return;

    dispatch(UserFeature.actions.addUserRecord({ userId: selectedUser.id, behaviorName }));
  };

  const addRecordComment = (e: React.SubmitEvent, id: number) => {
    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    dispatch(UserFeature.actions.addRecordComment({ recordId: id, comment }));
    setComment('');
  };

  const onDragEnd = (e: DragEndEvent) => {
    if (e.canceled) return;

    console.log(e);

    const targetId = e.operation.target?.id;
    if (targetId !== 'droppable') return;

    const behaviorName = e.operation.source?.data?.current?.behaviorName;
    if (!behaviorName) return;

    addUserRecord(behaviorName);
  };

  if (!behaviorSet) {
    return <span>Набор поведений не найден!</span>;
  }

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <div className={classes.container}>
        <section className={classes.section}>
          <div className={classes.search}>
            <Link to="/">
              <Button variant="outline" size="sm">
                <ChevronLeft size={16} /> Вернуться на Главную
              </Button>
            </Link>

            <Input
              type="text"
              placeholder="Найти"
              role="search"
              icon={<Search size={16} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {loading ? (
            <span>Loading...</span>
          ) : error ? (
            <span>{error}</span>
          ) : (
            <div className={classes.userList} role="list">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={clsx(
                    classes.userCard,
                    user.id === board.selectedUserId && classes.selectedUser,
                  )}
                  onClick={() => dispatch(BoardFeature.actions.setSelectedUserId(user.id))}
                  role="listitem"
                >
                  {user.name} {user.surname}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={classes.overviewSection} ref={ref}>
          {selectedUser && (
            <>
              <div className={classes.overviewHeader}>
                <h1 className={classes.name}>
                  {selectedUser.name} {selectedUser.surname}
                </h1>
                <span className={classes.description}>
                  Группа {board.group} &bull; {board.name}
                </span>
              </div>

              <div className={classes.overviewBehaviors} role="list">
                {selectedUser.records.map((record) => (
                  <div key={record.id} className={classes.overviewBehaviorCard} role="listitem">
                    <span>{record.behaviorName}</span>

                    <Dialog
                      title="Комментарии"
                      description={record.behaviorName}
                      trigger={
                        <button className={classes.commentButton}>
                          <MessageCircle size={18} />
                        </button>
                      }
                    >
                      <div className={classes.commentList} role="list">
                        {record.comments.map((c, i) => (
                          <div key={i} className={classes.commentCard} role="listitem">
                            {c}
                          </div>
                        ))}
                      </div>

                      <form
                        className={classes.commentForm}
                        onSubmit={(e) => addRecordComment(e, record.id)}
                      >
                        <Input
                          type="text"
                          placeholder="Введите комментарий"
                          className={classes.commentInput}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          required
                        />

                        <Button className={classes.createCommentButton}>
                          <ChevronUp />
                        </Button>
                      </form>
                    </Dialog>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        <section className={classes.section}>
          <div className={classes.behaviorsHeader}>
            <h1 className={classes.behaviorsTitle}>Набор поведений</h1>
            <h2 className={classes.behaviorsName}>{behaviorSet.name}</h2>
          </div>

          <div className={classes.behaviorList} role="list">
            {behaviorSet.behaviors.map((b, i) => (
              <BehaviorCard key={i} behavior={b} />
            ))}
          </div>
        </section>
      </div>
    </DragDropProvider>
  );
}
