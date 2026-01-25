export interface ProjectData {
  name: string;
  description: string;
  deadline: string;
  status: "planned" | "in_progress" | "completed";
  id: number;
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
}
