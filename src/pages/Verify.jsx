import { useLocation, useNavigate } from "react-router-dom";
import { useEmailVerificationQuery } from "../redux/features/users/usersApi";
import { useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

function Verify() {
  const location = useLocation();
  const { data, isLoading, error } = useEmailVerificationQuery(location.search);

  const navigate = useNavigate();

  useEffect(() => {
    if (error?.data?.errors) {
      const errors = error.data?.errors;
      navigate("/login", { state: errors?.message });
    }
    if (data?.success) {
      navigate("/login", { state: data?.message });
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

export default Verify;
