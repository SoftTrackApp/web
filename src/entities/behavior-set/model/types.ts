export interface Behavior {
  id: number;
  name: string;
}

export interface BehaviorSet {
  id: number;
  name: string;
  behaviors: Behavior[];
}
