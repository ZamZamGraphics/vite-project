import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyAdminEmailQuery } from "../redux/features/settings/settingsApi";
import { useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

function AdminEmailVerify() {
  const location = useLocation();
  const { data, isLoading, error } = useVerifyAdminEmailQuery(location.search);

  const navigate = useNavigate();

  useEffect(() => {
    if (error?.data?.errors) {
      const errors = error.data?.errors;
      navigate("/dashboard/settings", {
        state: { message: errors?.message, success: false },
      });
    }
    if (data?.success) {
      navigate("/dashboard/settings", {
        state: { message: data?.message, success: true },
      });
    }
  }, [data, error, navigate]);

  return isLoading ? (
    <Backdrop
      sx={{ color: "background", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Backdrop
      sx={{ color: "background", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={false}
    />
  );
}

export default AdminEmailVerify;
