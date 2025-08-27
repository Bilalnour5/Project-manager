import "./Sidebar.css";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function Sidebar() {
  return (
    <>
      <MenuIcon
        sx={{
          fontSize: 50,
          marginBottom: 3,
        }}
      ></MenuIcon>
      <div className="home_circle sidebar_item">
        <HomeOutlinedIcon
          sx={{
            fontSize: 40,
            color: "white",
            zIndex: 5,
          }}
        ></HomeOutlinedIcon>
      </div>
      <div className="sidebar_item">
        <FolderOutlinedIcon
          sx={{
            fontSize: 30,
          }}
        ></FolderOutlinedIcon>
      </div>
      <div className="sidebar_item">
        <AccountCircleOutlinedIcon
          sx={{
            fontSize: 30,
          }}
        ></AccountCircleOutlinedIcon>
      </div>
      <div className="sidebar_item">
        <SettingsOutlinedIcon
          sx={{
            fontSize: 30,
          }}
        ></SettingsOutlinedIcon>
      </div>
    </>
  );
}

export default Sidebar;
