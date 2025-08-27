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
          <div className="title_container">
            <h1>Project Name: {project?.name}</h1>
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
          <div className="task_grid">
            <div className="task-list">
              <h2>Tasks</h2>
              {task.map((task) => (
                <div key={task?.id} className="task-item">
                  <h3>{task?.name}</h3>
                  <p>{task?.detail}</p>
                  <p>Status: {task?.is_completed ? "Completed" : "Pending"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default projectPage;
