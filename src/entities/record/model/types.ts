export interface IRecord {
  id: number;
  title: string;
  behaviorId: number;
  comment: string;
  createdAt: string;
}

export interface RecordsResponse {
  content: IRecord[];
}
