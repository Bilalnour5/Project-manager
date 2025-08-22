export interface TaskData {
  id: number;
  name: string;
  detail: string;
  is_completed: boolean;
  project: number; // required foreign key (Project.id)
}
