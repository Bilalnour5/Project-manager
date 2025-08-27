export interface TaskData {
  id: number;
  name: string;
  detail: string;
  priority: "low" | "medium" | "high";
  time_spent_hours: number;
  estimated_hours: number;
  status: "not_started" | "in_progress" | "completed";
  project: number; // required foreign key (Project.id)
}
