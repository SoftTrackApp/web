export interface User {
  id: string;
  fName: string;
  lName: string;
}

export interface FetchUsersRequest {
  name1: string;
  name2?: string;
}
