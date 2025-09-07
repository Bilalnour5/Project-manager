import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./projectPage.css";
import "../layout.css";
import { getProjectById } from "../services/projectService";
import { getTasksByProject, createTask } from "../services/taskService";
import type { ProjectData } from "../types/projects";
import type { TaskData } from "../types/tasks";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";

function projectPage() {
  const params = useParams();

  const projectId = params.id ? parseInt(params.id) : 0;

  const [project, setProject] = useState<ProjectData>();
  const [task, setTask] = useState<TaskData[]>([]);
  const [addTaskOpen, setAddTaskOpen] = useState(false);

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
  // Creating Task object for form

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdTask = await createTask(newTask);
      setTask((prevTasks) => [...prevTasks, createdTask]);
      setAddTaskOpen(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
    console.log("Form submitted:", newTask);
  };

  // Function to extract headers from TaskData
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
    const fetchProject = async () => {
      try {
        const data = await getProjectById(projectId);
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    const fetchTasks = async () => {
      try {
        const data = await getTasksByProject(projectId);
        setTask(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchProject();
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

            <button
              onClick={() => setAddTaskOpen(true)}
              className="add_task_button"
            >
              + Add Task
            </button>
          </div>
          <div className="task_tracker">
            <div className="task_todo task_tracker--info">
              <div className="task_icon">
                <FormatListBulletedOutlinedIcon
                  style={{ fontSize: 40, color: "#5150f3" }}
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
