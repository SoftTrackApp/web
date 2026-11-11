import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GroupApi } from '@/entities/group/api';
import { BoardApi } from '../api';
import type { AddBehaviorAction, Board, BoardState } from './types';

export const boardQueryKey = ['board'] as const;

const initialBoardState: BoardState = {
  currentBoard: null,
  usersError: null,
};

let boardState: BoardState = initialBoardState;

export function useBoard() {
  return useQuery({
    queryKey: boardQueryKey,
    queryFn: () => boardState,
    initialData: initialBoardState,
    staleTime: Infinity,
  });
}

export function useSetBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (board: Board) => {
      boardState = { currentBoard: board, usersError: null };

      try {
        const users = await GroupApi.fetchIntersection({
          group: board.groupName1,
          subgroup: board.groupName2,
        });

        boardState = { currentBoard: { ...board, users }, usersError: null };
      } catch (err) {
        boardState = {
          currentBoard: board,
          usersError: err instanceof Error ? err.message : 'Произошла ошибка',
        };
      }

      return boardState;
    },
    onSuccess: () => {
      queryClient.setQueryData(boardQueryKey, boardState);
    },
  });
}

export function useSetBehaviorSetId() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (behaviorSetId: number) => {
      boardState = {
        ...boardState,
        currentBoard: boardState.currentBoard && {
          ...boardState.currentBoard,
          behaviorSetId,
        },
      };

      return boardState;
    },
    onSuccess: () => {
      queryClient.setQueryData(boardQueryKey, boardState);
    },
  });
}

export function useAddUserBehavior() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, behavior, title }: AddBehaviorAction) => {
      try {
        await BoardApi.createRecord({
          title,
          receiverId: userId,
          behaviorId: behavior.id,
        });
      } catch (err) {
        boardState = {
          ...boardState,
          usersError: err instanceof Error ? err.message : 'Произошла ошибка',
        };
      }

      if (boardState.currentBoard) {
        boardState = {
          ...boardState,
          currentBoard: {
            ...boardState.currentBoard,
            users: boardState.currentBoard.users.map((u) => {
              if (u.id !== userId) return u;

              return { ...u, behaviors: [...(u.behaviors ?? []), behavior] };
            }),
          },
        };
      }

      return boardState;
    },
    onSuccess: () => {
      queryClient.setQueryData(boardQueryKey, boardState);
    },
  });
}

export function useClearBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      boardState = initialBoardState;
      return boardState;
    },
    onSuccess: () => {
      queryClient.setQueryData(boardQueryKey, boardState);
    },
  });
}
