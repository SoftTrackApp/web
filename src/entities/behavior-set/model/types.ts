export interface Behavior {
  name: string;
}

export interface BehaviorSet {
  id: number;
  name: string;
  behaviors: Behavior[];
}

export interface BehaviorSetsState {
  behaviorSets: BehaviorSet[] | null;
  loading: boolean;
  error: string | null;
}
