import GridViewIcon from "@mui/icons-material/GridView";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SettingsIcon from "@mui/icons-material/Settings";

const sidebarRoutes = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <GridViewIcon />,
  },
  {
    path: "/dashboard/users",
    title: "Users",
    icon: <PeopleOutlineIcon />,
    child: [
      {
        path: "/dashboard/users",
        title: "All Users",
      },
      {
        path: "/dashboard/users/new",
        title: "New User",
      },
      {
        path: "/dashboard/users/profile",
        title: "Profile",
      },
    ],
  },
  {
    path: "/dashboard/settings",
    title: "Settings",
    icon: <SettingsIcon />,
  },
];

export default sidebarRoutes;
