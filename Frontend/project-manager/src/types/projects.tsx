export interface ProjectData {
  name: string;
  description: string;
  deadline: string;
  status: "planned" | "in_progress" | "completed";
}
