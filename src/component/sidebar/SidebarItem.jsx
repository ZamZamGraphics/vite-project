import { ListItemButton, ListItemIcon } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ item, handleDrawerToggle }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const style = {
    "&.Mui-selected, &.Mui-selected: hover": {
      fontWeight: "bold",
      color: "active.text",
      backgroundColor: "active.background",
    },
    "&: hover": {
      fontWeight: "bold",
      color: "active.text",
      backgroundColor: "active.background",
    },
    paddingY: "10px",
    paddingX: "15px",
  };

  return item && item.path ? (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={style}
      onClick={handleDrawerToggle}
      selected={pathname === item.path && true}
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
