import type { Behavior } from '@/entities/behavior';

export interface BehaviorSet {
  id: number;
  name: string;
  behaviors: Behavior[];
}

export interface BehaviorSetState {
  data: BehaviorSet[];
  isLoading: boolean;
  error: string | null;
}
