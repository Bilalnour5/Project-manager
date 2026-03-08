import "./Navbar.css";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import { createProject } from "../services/projectService";
import { useState } from "react";
import type { CreateProjectPayload } from "../types/projects";
import type projectPage from "../pages/projectPage";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(projectName);
      const projectPayload: CreateProjectPayload = {
        name: projectName,
        description: "",
        deadline: null,
        status: "planned",
      };
      console.log(projectPayload);
      await createProject(projectPayload);

      setIsModalOpen(false); // Close the popup
      setProjectName("");
    } catch (error) {
      console.error("Failed to add Project", error);
    }
  };

  const handleProjectForm = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProjectName(""); // Good practice: clear the form when closing
  };

  return (
    <>
      <div className="navbar_container">
        <h1>Project Manager</h1>
        <div className="account_container">
          <button className="add-item-button" onClick={handleProjectForm}>
            <AddIcon sx={{ fontSize: 30 }} />
          </button>
          <div className="notifications">
            <NotificationsNoneOutlinedIcon sx={{ fontSize: 30 }} />
          </div>
          <div className="user_container">
            <div className="user_icon">
              <Avatar />
            </div>

            <h3>Hira r</h3>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          {/* We use e.stopPropagation() so clicking inside the white box doesn't trigger the overlay's onClick and close the modal */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Project</h2>

            <form onSubmit={handleAddItem}>
              <div className="input-group">
                <label htmlFor="projectName">Project Name</label>
                <input
                  id="projectName"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                  placeholder="e.g., Website Redesign"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
