import axios from "axios";
import type { TaskData } from "../types/tasks";

const API_BASE_URL = "http://localhost:8000/api/tasks";

export const getTasks = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log("Tasks fetched from API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (taskData: TaskData) => {
  try {
    const response = await axios.post(API_BASE_URL, taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (taskId: number, taskData: TaskData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const getTasksByProject = async (projectId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?project=${projectId}`);
    console.log(
      `Tasks for project ${projectId} fetched from API:`,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching tasks for project ${projectId}:`, error);
    throw error;
  }
};
