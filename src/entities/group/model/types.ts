export interface Group {
  name: string;
  description: string;
}

export interface GroupState {
  academicGroups: Group[];
  otherGroups: Group[];
  isLoading: boolean;
  error: string | null;
}

export interface IntersectionRequest {
  group?: string;
  subgroup?: string;
}
