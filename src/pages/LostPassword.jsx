import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../assets/images/logo-dark.svg";
import logoLight from "../assets/images/logo-light.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForgotPasswordMutation } from "../redux/features/forgotPassword/forgotPasswordApi";

const PasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("User Email is required")
    .email("must be a valid email"),
});

function LostPassword() {
  const [error, setError] = useState("");
  const darkMode = useSelector((state) => state.theme.darkMode);
  const logo = darkMode ? logoLight : logoDark;

  const [forgotPassword, { data, isLoading, error: responseError }] =
    useForgotPasswordMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }

    if (responseError?.error) {
      setError({
        errors: {
          msg: "Network Error",
        },
      });
    }
    if (data?.success) {
      navigate("/login", { state: data?.msg });
    }
  }, [responseError, data, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: PasswordSchema,
    onSubmit: (values) => {
      setError("");
      forgotPassword(values);
    },
  });

  return (
    <Grid
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            padding: 4,
            backgroundColor: "background.paper",
            borderRadius: "10px",
            boxShadow: 2,
          }}
        >
          <Box display="flex" justifyContent="center" mb={2}>
            <img src={logo} alt="AL MADINA IT" width={300} />
          </Box>
          <Typography
            component="h5"
            className="text-blue-500"
            sx={{ textAlign: "center" }}
            variant="h5"
          >
            Recover your password
          </Typography>
          {error && (
            <Alert sx={{ mt: 2, width: "100%" }} severity="error">
              {error.errors?.msg && error.errors.msg}
              {error?.message && error?.message}
            </Alert>
          )}
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              variant="standard"
              label="User Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              id={formik.errors.email && "standard-error"}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ borderRadius: "9999px", mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Send link
            </Button>
          </Box>
          <Link to="/login" className="text-center no-underline text-blue-500">
            <Typography variant="body1">Login</Typography>
          </Link>
        </Box>
      </Container>
    </Grid>
  );
}

export default LostPassword;
