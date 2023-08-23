import { ListItemButton, ListItemIcon } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ item, handleDrawerToggle }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const style = {
    "&: hover": {
      color: "active.text",
      backgroundColor: "active.background",
    },
    color: pathname === item.path ? "active.text" : "unset",
    backgroundColor: pathname === item.path ? "active.background" : "unset",
    paddingY: "10px",
    paddingX: "15px",
  };

  return item && item.path ? (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={style}
      onClick={handleDrawerToggle}
    >
      <ListItemIcon
        sx={{
          color: "active.text",
          opacity: 0.3,
          minWidth: "40px",
        }}
      >
        {item.icon && item.icon}
      </ListItemIcon>
      {item.title}
    </ListItemButton>
  ) : null;
};

export default SidebarItem;
