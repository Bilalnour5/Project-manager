import Sidebar from "../components/Sidebar";
import "./projectPage.css";
import "../layout.css";
import { useState, useEffect } from "react";
import { getProjectById } from "../services/projectService";
import { getTasksByProject } from "../services/taskService";
import type { ProjectData } from "../types/projects";
import type { TaskData } from "../types/tasks";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";

function projectPage() {
  const [project, setProject] = useState<ProjectData>();
  const [task, setTask] = useState<TaskData[]>([]);

  const statusMap = {
    not_started: "Not Started",
    in_progress: "In Progress",
    completed: "Completed",
  };

  const extractHeadersFromData = (data: TaskData[]) => {
    if (!data || data.length === 0) return [];
    const keys = Object.keys(data[0]);

    // Use slice to get from 2nd element (index 1) to 2nd last element (index -1)
    const filteredKeys = keys.slice(1, -1);
    // Get keys from first item and format them
    return filteredKeys.map((key) => ({
      key,
      // Format key to title case (e.g., "taskName" -> "Task Name")
      label: key
        .replace(/_/g, " ")
        .replace(/(^|\s)[a-z]/g, (str) => str.toUpperCase()),
    }));
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjectById(1);
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    const fetchTasks = async () => {
      try {
        const data = await getTasksByProject(1);
        setTask(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchProjects();
    fetchTasks();
  }, []);

  return (
    <>
      <div className="layout">
        <div className="sidebar_container">
          <Sidebar />
        </div>
        <div className="main_container">
          <div className="project_title_container">
            <div>
              <h1 className="project_title">Project Name: {project?.name}</h1>
              <p>number of task 7</p>
            </div>

            <button>
              <a href="/createTask">+ Add Task</a>
            </button>
          </div>
          <div className="task_tracker">
            <div className="task_todo task_tracker--info">
              <div className="task_icon">
                <FormatListBulletedOutlinedIcon
                  style={{ fontSize: 40, color: "#4A90E2" }}
                />
              </div>
              <div className="task_tracker--detail">
                <h2>10</h2>
                <p>To Do</p>
              </div>
            </div>

            <div className="task_in_progress task_tracker--info">
              <div className="task_icon">
                <AutorenewOutlinedIcon
                  style={{ fontSize: 40, color: "#F5A623" }}
                />
              </div>
              <div className="task_tracker--detail">
                <h2>5</h2>
                <p>In Progress</p>
              </div>
              `
            </div>

            <div className="task_completed task_tracker--info">
              <div className="task_icon">
                <CheckCircleOutlineOutlinedIcon
                  style={{ fontSize: 40, color: "#7ED321" }}
                />
              </div>
              <div className="task_tracker--detail">
                <h2>8</h2>
                <p>Completed</p>
              </div>
            </div>
          </div>
          <table className="task_table">
            <thead>
              <tr>
                {extractHeadersFromData(task).map((header) => (
                  <th key={header.key}>{header.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {task.map((task) => (
                <tr key={task?.id}>
                  <td>{task?.name}</td>
                  <td>{task?.detail}</td>
                  <td>{task?.priority}</td>
                  <td>{task?.time_spent_hours}</td>
                  <td>{task?.estimated_hours}</td>
                  <td>{statusMap[task?.status]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default projectPage;
