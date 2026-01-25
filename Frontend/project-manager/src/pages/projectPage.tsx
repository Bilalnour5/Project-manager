import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Sidebar from "../components/Sidebar";
import "./projectPage.css";
import "../layout.css";
import { getProjectById } from "../services/projectService";
import {
  getTasksByData,
  createTask,
  updateTask,
} from "../services/taskService";
import type { ProjectData } from "../types/projects";
import type { TaskData } from "../types/tasks";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

function projectPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const projectId = Number(searchParams.get("project_id") || 1);
  const [project, setProject] = useState<ProjectData>();
  const [tasks, setTasks] = useState<TaskData[]>([]);
  // const [taskUpdated, setTaskUpdated] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [newTask, setNewTask] = useState<Omit<TaskData, "id">>({
    name: "",
    detail: "",
    priority: "medium",
    time_spent_hours: 0,
    estimated_hours: 0,
    status: "not_started",
    project: projectId,
  });

  const statusMap = {
    not_started: "Not Started",
    in_progress: "In Progress",
    completed: "Completed",
  };

  // Handles input changes in the new task form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]:
        name === "time_spent_hours" || name === "estimated_hours"
          ? Number(value)
          : value,
    }));
  };

  // Updates search params in the URL
  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  // Updates task when checkbox is clicked
  const handleTaskUpdate = async (task: TaskData) => {
    try {
      task.status = "completed";
      await updateTask(task.id, task);
      setTasks((currentTasks) => currentTasks.filter((t) => t.id !== task.id));
      console.log("Updated task successfully");
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  // Submits new task form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdTask = await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setAddTaskOpen(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
    console.log("Form submitted:", newTask);
  };

  // Function to extract headers for the task table
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
    if (!projectId) return;
    console.log("fetching data for projectId:", projectId);
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [projectData, tasksData] = await Promise.all([
          getProjectById(projectId),
          getTasksByData(searchParams),
        ]);

        setProject(projectData[0]);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error loading page:", error);
      } finally {
        setIsLoading(false);
        console.log(searchParams);
      }
    };

    loadData();
  }, [projectId, searchParams]);

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
              <p>number of task {tasks.length}</p>
            </div>

            <button
              onClick={() => setAddTaskOpen(true)}
              className="add_task_button"
            >
              + Add Task
            </button>
          </div>
          <div className="task_tracker">
            <div
              className="task_todo task_tracker--info"
              onClick={() => {
                updateSearchParam("status", "not_started");
              }}
            >
              <div className="task_icon">
                <FormatListBulletedOutlinedIcon
                  style={{ fontSize: 40, color: "#5150f3" }}
                />
              </div>
              <div className="task_tracker--detail">
                <h2>{project?.pending_tasks}</h2>
                <p>Pending</p>
              </div>
            </div>

            <div
              className="task_completed task_tracker--info"
              onClick={() => {
                updateSearchParam("status", "completed");
              }}
            >
              <div className="task_icon">
                <CheckCircleOutlineOutlinedIcon
                  style={{ fontSize: 40, color: "#7ED321" }}
                />
              </div>
              <div className="task_tracker--detail">
                <h2>{project?.completed_tasks}</h2>
                <p>Completed</p>
              </div>
            </div>
          </div>
          <table className="task_table">
            <thead>
              <tr>
                {extractHeadersFromData(tasks).map((header) => (
                  <th key={header.key}>{header.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task: TaskData) => (
                <tr key={task?.id}>
                  <td>
                    <input
                      type="checkbox"
                      onClick={() => handleTaskUpdate(task)}
                    />
                    {task?.name}
                  </td>
                  <td>{task?.detail}</td>
                  <td>{task?.priority}</td>
                  <td>{task?.time_spent_hours}</td>
                  <td>{task?.estimated_hours}</td>
                  <td>
                    <div className="task_edit">
                      {statusMap[task?.status]}
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {addTaskOpen && (
          <div className="add_task_overlay">
            <div className="add_task_container">
              <form className="add_task_form" onSubmit={handleSubmit}>
                <h3>Add New Task</h3>

                <label htmlFor="name">Task Name: </label>
                <input
                  type="text"
                  className="add_task_input"
                  name="name"
                  onChange={handleInputChange}
                />

                <label htmlFor="detail">Detail: </label>
                <input
                  type="text"
                  className="add_task_input"
                  name="detail"
                  onChange={handleInputChange}
                />

                <label htmlFor="priority">Priority: </label>
                <select
                  className="add_task_input"
                  name="priority"
                  onChange={handleInputChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <label htmlFor="estimated_hours">Estimated Hours: </label>
                <input
                  type="number"
                  className="add_task_input"
                  name="estimated_hours"
                  onChange={handleInputChange}
                />

                <label htmlFor="status">Status: </label>
                <select
                  className="add_task_input"
                  name="status"
                  onChange={handleInputChange}
                >
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <button className="submit_task_button">Add Task</button>
              </form>
              <button
                className="close_add_task"
                onClick={() => setAddTaskOpen(false)}
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default projectPage;
