import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import LostPassword from "./pages/LostPassword";
import ResetPassword from "./pages/ResetPassword";
import Verify from "./pages/Verify";
import Layout from "./component/Layout";
import PrivateRoute from "./component/PrivateRoute";
import PublicRoute from "./component/PublicRoute";
import NotFoundPage from "./component/NotFoundPage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Users from "./pages/dashboard/users/Users";
import NewUser from "./pages/dashboard/users/NewUser";
import EditUser from "./pages/dashboard/users/EditUser";
import Profile from "./pages/dashboard/users/Profile";
import Settings from "./pages/dashboard/Settings";
import useAuthCheck from "./hooks/useAuthCheck";
import {
  Backdrop,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/verify" element={<Verify />} />
      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="lost-password"
        element={
          <PublicRoute>
            <LostPassword />
          </PublicRoute>
        }
      />
      <Route
        path="reset"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="users" element={<Users />} />
        <Route path="users/new" element={<NewUser />} />
        <Route path="users/:userId" element={<EditUser />} />
        <Route path="users/profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

function App() {
  const authChecked = useAuthCheck();

  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = useMemo(() => createTheme(themeSettings(darkMode)), [darkMode]);
  return !authChecked ? (
    <Backdrop
      sx={{ color: "background", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    />
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
