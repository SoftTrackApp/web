export interface Comment {
  id: number;
  author: string;
  createdAt: string;
  content: string;
}

export interface Skill {
  id: number;
  title: string;
  rates: number;
  comments: Comment[];
}
