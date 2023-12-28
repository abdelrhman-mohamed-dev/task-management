export interface IUser {
  id: number | null;
  name: string | null;
  email: string | null;
  profileImg: string | null;
  jobTitle: string | null;
}
export interface ICategory {
  id: number;
  title: string;
}
export interface ITask {
  id: number;
  title: string;
  isCompleted: boolean;
  date: string;
  category: ICategory;
}
