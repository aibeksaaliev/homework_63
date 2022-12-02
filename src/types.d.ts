import exp from "constants";

export interface PostType {
  id?: string;
  title: string;
  description: string;
  time: string;
}

export interface PostsType {
  [id: string]: PostType;
}

export interface AboutInfoType {
  established: string;
  history: string;
  mission: string;
  posts: string;
}

export interface ContactsInfoType {
  phone: string;
  email: string;
}