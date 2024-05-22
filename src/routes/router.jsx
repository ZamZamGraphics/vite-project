import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Layout from "../component/Layout";
import NotFoundPage from "../component/NotFoundPage";
import PrivateRoute from "../component/PrivateRoute";
import PublicRoute from "../component/PublicRoute";
import AdminEmailVerify from "../pages/AdminEmailVerify";
import Admission from "../pages/dashboard/admission/Admission";
import Invoice from "../pages/dashboard/admission/Invoice";
import NewAdmission from "../pages/dashboard/admission/NewAdmission";
import Payment from "../pages/dashboard/admission/Payment";
import Batches from "../pages/dashboard/batches/Batches";
import Courses from "../pages/dashboard/courses/Courses";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Messages from "../pages/dashboard/messages/Messages";
import Settings from "../pages/dashboard/settings/Settings";
import NewStudent from "../pages/dashboard/students/NewStudent";
import StudentEdit from "../pages/dashboard/students/StudentEdit";
import Students from "../pages/dashboard/students/Students";
import EditUser from "../pages/dashboard/users/EditUser";
import NewUser from "../pages/dashboard/users/NewUser";
import Profile from "../pages/dashboard/users/Profile";
import Users from "../pages/dashboard/users/Users";
import Login from "../pages/Login";
import LostPassword from "../pages/LostPassword";
import ResetPassword from "../pages/ResetPassword";
import Verify from "../pages/Verify";

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
        path="dashboard/admission/invoice/:id"
        element={
          <PrivateRoute>
            <Invoice />
          </PrivateRoute>
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
        <Route path="students" element={<Students />} />
        <Route path="students/new" element={<NewStudent />} />
        <Route path="students/:studentId" element={<StudentEdit />} />
        <Route path="admission" element={<Admission />} />
        <Route path="admission/new" element={<NewAdmission />} />
        <Route path="admission/payment" element={<Payment />} />
        <Route path="admission/courses" element={<Courses />} />
        <Route path="admission/batches" element={<Batches />} />
        <Route path="messages" element={<Messages/>} />
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
