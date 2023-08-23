import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const sidebarWidth = "220px";
const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  marginTop: "45px",
}));

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <Navbar
        sidebarWidth={sidebarWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        sidebarWidth={sidebarWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Main sx={{ ml: { sm: sidebarWidth } }}>
        <Outlet />
      </Main>
    </div>
  );
}

export default Layout;
