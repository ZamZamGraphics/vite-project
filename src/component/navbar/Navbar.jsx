import AddIcon from '@mui/icons-material/Add';
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Settings from "@mui/icons-material/Settings";
import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeSwitch from "../../component/ThemeSwitch";
import { userLoggedOut } from "../../redux/features/auth/authSlice";
import { useGetUserQuery } from "../../redux/features/users/usersApi";
import { deleteCookie, setCookie } from "../../utils/cookie";

function Navbar({ sidebarWidth, handleDrawerToggle }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  const auth = useSelector((state) => state.auth);
  const { userid } = auth.user;

  const { data: user } = useGetUserQuery(userid);

  const dispatch = useDispatch();

  const {pathname} = useLocation();
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearch(value);
    navigate(`./students?limit=20&search=${value}`);
  };

  const handleNewStudentURL = () => navigate('./students/new');

  useEffect(() => {
    if(pathname !== "/dashboard/students") {
      setSearch("");
    }
  },[pathname])

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
        <Toolbar disableGutters sx={{ padding:1, minHeight: ["45px", "45px", "45px"] }}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item xs={6} md={9} container direction="row" justifyContent="start" alignItems="center">
              <Box sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1 }}>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 2 }}>
                <FormControl 
                  fullWidth
                  sx={{ bgcolor:"background.paper" }}
                >
                  <InputLabel htmlFor="search" size="small">
                    Search
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    id="search"
                    type="search"
                    label="Search"
                    name="search"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
              <Box>
                <Button variant="contained" color="success" disableElevation onClick={handleNewStudentURL}>
                  {small ? <AddIcon/> : "Add New Student"}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} container direction="row" justifyContent="end" alignItems="center">
              <Box sx={{ paddingX: 2 }}>
                <ThemeSwitch />
              </Box>
              <Box>
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
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
