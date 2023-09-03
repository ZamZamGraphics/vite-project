import { Drawer, List, Stack, Toolbar } from "@mui/material";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import sidebarRoutes from "../../routes";
import { Link } from "react-router-dom";
import logoDark from "../../assets/images/logo-dark.svg";
import logoLight from "../../assets/images/logo-light.svg";
import { useSelector } from "react-redux";

function Sidebar(props) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const logo = darkMode ? logoLight : logoDark;
  const { window, sidebarWidth, mobileOpen, handleDrawerToggle } = props;

  const drawer = (
    <List disablePadding>
      <Toolbar sx={{ marginBottom: "20px" }}>
        <Stack sx={{ width: "100%" }} direction="row" justifyContent="center">
          <Link to="/dashboard" onClick={handleDrawerToggle}>
            <img src={logo} alt="AL MADINA IT" width={200} />
          </Link>
        </Stack>
      </Toolbar>
      {sidebarRoutes.map((route, index) =>
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
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
          disableScrollLock: true,
        }}
        color="text"
        bgcolor="background"
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        ModalProps={{
          disableScrollLock: true,
        }}
        color="text"
        bgcolor="background"
        sx={{
          display: { xs: "none", sm: "block" },
          width: sidebarWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",
            borderRight: "0px",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Sidebar;
