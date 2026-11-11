import { useAddUserBehavior, useBoard, useClearBoard, useSetBehaviorSetId, useSetBoard } from './model/hooks';

export const BoardEntity = {
  useBoard,
  useSetBoard,
  useSetBehaviorSetId,
  useAddUserBehavior,
  useClearBoard,
};

export type { Board, AddBehaviorAction, RecordCreate } from './model/types';
