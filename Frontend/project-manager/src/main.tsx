import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainPage from "./pages/MainPage";
import ProjectPage from "./pages/projectPage";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/dashboard" element={<MainPage />} />
      <Route path="/project" element={<ProjectPage />} />
    </Routes>
  </Router>
);
