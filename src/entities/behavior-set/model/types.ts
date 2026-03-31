export interface Behavior {
  name: string;
}

export interface BehaviorSet {
  id: number;
  name: string;
  behaviors: Behavior[];
}

export interface BehaviorSetState {
  behaviorSets: BehaviorSet[] | null;
  loading: boolean;
  error: string | null;
}
