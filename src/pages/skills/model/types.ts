export interface Skill {
  id: string;
  name: string;
}

export interface Behavior {
  id: string;
  name: string;
  skills: Skill[];
}

export interface SkillSet {
  id: string;
  name: string;
  behaviors: Behavior[];
}

export interface SkillTemplate {
  id: string;
  name: string;
}

export interface BehaviorTemplate {
  id: string;
  name: string;
  skills: string[];
}
