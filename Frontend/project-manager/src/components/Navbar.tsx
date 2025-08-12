import "./Navbar.css";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";

function Navbar() {
  return (
    <>
      <div className="navbar_container">
        <h1>Project Manager</h1>
        <div className="account_container">
          <div className="add_item">
            <AddIcon sx={{ fontSize: 30 }} />
          </div>
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
    </>
  );
}

export default Navbar;
