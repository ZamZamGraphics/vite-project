import GridViewIcon from "@mui/icons-material/GridView";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SettingsIcon from "@mui/icons-material/Settings";

const sidebarRoutes = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <GridViewIcon />,
  },
  {
    path: "/dashboard/students",
    title: "Students",
    icon: <PeopleAltIcon />,
    child: [
      {
        path: "/dashboard/students",
        title: "All Students",
      },
      {
        path: "/dashboard/students/new",
        title: "Add New",
      },
    ],
  },
  {
    path: "/dashboard/admission",
    title: "Admission",
    icon: <SchoolIcon />,
    child: [
      {
        path: "/dashboard/admission",
        title: "All Admission",
      },
      {
        path: "/dashboard/admission/new",
        title: "Add New",
      },
      {
        path: "/dashboard/admission/payment",
        title: "Payment",
      },
      {
        path: "/dashboard/admission/courses",
        title: "Courses",
      },
      {
        path: "/dashboard/admission/batches",
        title: "Batches",
      },
    ],
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
        title: "Add New",
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
