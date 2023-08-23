import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";

const SidebarItemCollapse = ({ item, handleDrawerToggle }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [open, setOpen] = useState(false);

  const checkOpen = pathname.includes(item.path) ? true : false;

  useEffect(() => {
    setOpen(checkOpen);
  }, [checkOpen]);

  return item ? (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          "&: hover": {
            backgroundColor: "active.background",
          },
          paddingY: "10px",
          paddingX: "15px",
        }}
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
        <ListItemText
          disableTypography
          primary={<Typography>{item.title}</Typography>}
        />
        {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List>
          {item.child?.map((route, index) =>
            route ? (
              route.child ? (
                <SidebarItemCollapse
                  item={route}
                  key={index}
                  handleDrawerToggle={handleDrawerToggle}
                />
              ) : (
                <SidebarItem
                  item={route}
                  key={index}
                  handleDrawerToggle={handleDrawerToggle}
                />
              )
            ) : null
          )}
        </List>
      </Collapse>
    </>
  ) : null;
};

export default SidebarItemCollapse;
