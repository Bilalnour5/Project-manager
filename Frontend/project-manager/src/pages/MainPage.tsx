import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./MainPage.css";
import "../layout.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useState, useEffect } from "react";
import { getProjects } from "../services/projectService";
import { getTasks, updateTask } from "../services/taskService";
import type { ProjectData } from "../types/projects";
import type { TaskData } from "../types/tasks";
import { useSearchParams, useNavigate } from "react-router-dom";

function FrontPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [completingIds, setCompletingIds] = useState<number[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get("query") || "";
    console.log("Search query:", query);
  }, [searchParams]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchProjects();
    fetchTasks();
  }, []);

  const handleCompleteTask = async (task: TaskData) => {
    setCompletingIds((prevIds) => [...prevIds, task.id]);

    try {
      // 2. The API Call (pure data, no fake properties!)
      const dataToSend: TaskData = { ...task, status: "completed" };
      await updateTask(task.id, dataToSend);

      // 3. The Cleanup
      setTimeout(() => {
        // Remove the task from the main list
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));

        // Clean up our UI state too, so the ID doesn't get stuck in there forever
        setCompletingIds((prevIds) => prevIds.filter((id) => id !== task.id));
      }, 400);
    } catch (error) {
      // 4. The Fallback: Server failed.
      // Simply remove the ID from the animating list to reverse the CSS transition.
      console.error("Failed to update task on the server");
      setCompletingIds((prevIds) => prevIds.filter((id) => id !== task.id));
    }
  };
  return (
    <>
      <div className="layout">
        <div className="sidebar_container">
          <Sidebar />
        </div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="project_container">
          <div className="title_container">
            <h1>Projects</h1>
            <div className="date">
              <h2>August 8th</h2>
            </div>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <Card
                onClick={() => navigate(`/project/?project_id=${project.id}`)}
                sx={{
                  maxWidth: 345,
                  boxShadow: "0px 0px 13px 0px rgba(0,0,0,0.2)",
                  bgcolor: "#ffff",
                  borderRadius: 10,

                  padding: 0.5,
                  height: 300,
                  transition: "0.3s",

                  "&:hover": {
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Make shadow deeper
                    cursor: "pointer",
                    transform: "scale(1.02)", // Optional: slightly grow the card
                  },
                }}
              >
                {/* Header with date and menu button */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {project.deadline}
                  </Typography>
                  <IconButton aria-label="settings" disabled>
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                {/* Centered content */}
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {project.name}
                  </Typography>
                  <Box
                    sx={{
                      width: "80%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ marginRight: "auto" }}
                    >
                      Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={
                        project.completed_tasks == project.task_count
                          ? 100
                          : (project.completed_tasks / project.task_count) * 100
                      }
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        width: "100%",
                        mb: 1,
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ marginLeft: "auto" }}
                    >
                      {project.completed_tasks == project.task_count
                        ? 100
                        : (project.completed_tasks / project.task_count) * 100}
                      %
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="task_container">
          <div className="task_header">
            <h1>Tasks</h1>
            <SearchIcon sx={{ fontSize: 30 }} />
          </div>
          <ul className="task_list">
            {tasks.map((task) => (
              <li className="task-item" key={task.id}>
                <button
                  className="complete-btn"
                  onClick={() => handleCompleteTask(task)}
                  aria-label="Complete task"
                />
                <p>{task.name}</p>
                <IconButton
                  aria-label="settings"
                  disabled
                  sx={{ marginLeft: "auto" }}
                >
                  <MoreVertIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default FrontPage;
