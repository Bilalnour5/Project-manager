import "./Sidebar.css";
import { useLocation, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function Sidebar() {
  const location = useLocation();
  console.log(location.pathname);
  const isDashboard = location.pathname === "/dashboard";
  const isProjects = location.pathname.startsWith("/project");
  const isProfile = location.pathname === "/profile";
  const isSettings = location.pathname === "/settings";
  return (
    <>
      <MenuIcon
        sx={{
          fontSize: 40,
          marginBottom: 3,
        }}
      ></MenuIcon>
      <Link
        to="/dashboard"
        className={`sidebar_item ${isDashboard ? "active_circle" : ""}`}
      >
        <div>
          <HomeOutlinedIcon
            sx={{
              fontSize: 40,
              zIndex: 5,
            }}
          ></HomeOutlinedIcon>
        </div>
      </Link>
      <Link
        to="/project/?project_id=1"
        className={`sidebar_item ${isProjects ? "active_circle" : ""}`}
      >
        <FolderOutlinedIcon
          sx={{
            fontSize: 30,
          }}
        ></FolderOutlinedIcon>
      </Link>
      <Link
        to="/dashboard"
        className={`sidebar_item ${isProfile ? "active_circle" : ""}`}
      >
        <AccountCircleOutlinedIcon
          sx={{
            fontSize: 30,
          }}
        ></AccountCircleOutlinedIcon>
      </Link>
      <Link
        to="/dashboard"
        className={`sidebar_item ${isSettings ? "active_circle" : ""}`}
      >
        <SettingsOutlinedIcon
          sx={{
            fontSize: 30,
          }}
        ></SettingsOutlinedIcon>
      </Link>
    </>
  );
}

export default Sidebar;
