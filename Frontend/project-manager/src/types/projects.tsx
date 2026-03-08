export interface ProjectData {
  readonly id: number;
  name: string;
  description: string;
  deadline: string | null;
  status: "planned" | "in_progress" | "completed";

  // Backend computed fields
  readonly task_count: number;
  readonly completed_tasks: number;
  readonly pending_tasks: number;
}

export type CreateProjectPayload = Omit<
  ProjectData,
  "id" | "task_count" | "completed_tasks" | "pending_tasks"
>;
