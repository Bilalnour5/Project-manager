import axios from "axios";
import type { ProjectData } from "../types/projects";
const API_BASE_URL = "http://localhost:8000/api/projects";

export const getProjects = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log("Projects fetched from API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
export const createProject = async (projectData: ProjectData) => {
  try {
    const response = await axios.post(API_BASE_URL, projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};
export const updateProject = async (
  projectId: number,
  projectData: ProjectData
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${projectId}`,
      projectData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (projectId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
