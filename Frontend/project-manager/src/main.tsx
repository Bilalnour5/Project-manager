import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainPage from "./pages/MainPage";
import ProjectPage from "./pages/projectPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <MainPage /> */}
    <ProjectPage />
  </StrictMode>
);
