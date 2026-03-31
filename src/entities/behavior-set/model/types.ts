export interface BehaviorSet {
  id: number;
  name: string;
}

export interface BehaviorSetState {
  behaviorSets: BehaviorSet[] | null;
  loading: boolean;
  error: string | null;
}
