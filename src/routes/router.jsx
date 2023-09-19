import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Login from "../pages/Login";
import LostPassword from "../pages/LostPassword";
import ResetPassword from "../pages/ResetPassword";
import Verify from "../pages/Verify";
import AdminEmailVerify from "../pages/AdminEmailVerify";
import Layout from "../component/Layout";
import PrivateRoute from "../component/PrivateRoute";
import PublicRoute from "../component/PublicRoute";
import NotFoundPage from "../component/NotFoundPage";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Users from "../pages/dashboard/users/Users";
import NewUser from "../pages/dashboard/users/NewUser";
import EditUser from "../pages/dashboard/users/EditUser";
import Profile from "../pages/dashboard/users/Profile";
import Settings from "../pages/dashboard/Settings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="verify" element={<Verify />} />
      <Route
        path="adminemailverify"
        element={
          <PrivateRoute>
            <AdminEmailVerify />
          </PrivateRoute>
        }
      />
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
export default router;
