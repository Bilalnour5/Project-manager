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
import { getTasks } from "../services/taskService";
import type { ProjectData } from "../types/projects";
import type { TaskData } from "../types/tasks";

function FrontPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [tasks, setTasks] = useState<TaskData[]>([]);

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
                sx={{
                  maxWidth: 345,
                  boxShadow: "0px 0px 13px 0px rgba(0,0,0,0.2)",
                  bgcolor: "#ffff",
                  borderRadius: 10,

                  padding: 0.5,
                  height: 300,
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 3 }}
                  >
                    {project.description}
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
                      value={65}
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
                      65%
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
          {tasks.map((task) => (
            <div className="task_item" key={task.id}>
              <div className="task_item_container">
                <div className="task_project"></div>
                <div className="task_detail">
                  <h2 className="task_name">{task.name}</h2>
                  <p className="task_description">{task.detail}</p>
                  <p className="task_deadline">Deadline: N/A</p>
                </div>
                <IconButton
                  aria-label="settings"
                  disabled
                  sx={{ marginLeft: "auto" }}
                >
                  <MoreVertIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FrontPage;
