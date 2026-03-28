export interface Skillset {
  id: number;
  name: string;
}

export interface SkillsetsState {
  skillsets: Skillset[] | null;
  loading: boolean;
  error: string | null;
}
