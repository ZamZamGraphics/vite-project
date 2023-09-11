import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ThemeSwitch from "../../component/ThemeSwitch";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../redux/features/auth/authSlice";
import { setCookie, deleteCookie } from "../../utils/cookie";
import { useGetUserQuery } from "../../redux/features/users/usersApi";
import jwt_decode from "jwt-decode";
import { getCookie } from "../../utils/cookie";

function Navbar({ sidebarWidth, handleDrawerToggle }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const token = getCookie("accessToken");
  const loggedUser = token ? jwt_decode(token) : false;
  const { userid } = loggedUser || null;

  const { data: user } = useGetUserQuery(userid);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("loggedIn");
    setCookie("loggedIn", "false", 1);
    deleteCookie("accessToken");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${sidebarWidth})` },
        ml: { sm: sidebarWidth },
        boxShadow: 0,
      }}
      color="text"
      bgcolor="background"
    >
      <Container maxWidth="false">
        <Toolbar disableGutters sx={{ minHeight: ["45px", "45px", "45px"] }}>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="small"
              color="inherit"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ paddingX: 2 }}>
            <ThemeSwitch />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
              <Avatar
                alt={user?.fullname}
                src={`${import.meta.env.VITE_API_URL}/upload/${user?.avatar}`}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  boxShadow: 3,
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                component={Link}
                to="/dashboard/users/profile"
                onClick={handleClose}
              >
                <Avatar
                  alt={user?.fullname}
                  src={`${import.meta.env.VITE_API_URL}/upload/${user?.avatar}`}
                />{" "}
                My account
              </MenuItem>
              <Divider />
              <MenuItem
                component={Link}
                to="/dashboard/settings"
                onClick={handleClose}
              >
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
