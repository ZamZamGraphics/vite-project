import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoDark from "../assets/images/logo-dark.svg";
import logoLight from "../assets/images/logo-light.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../redux/features/auth/authApi";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const logo = darkMode ? logoLight : logoDark;

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data.errors);
    }

    if (responseError?.error) {
      setError({ message: "Network Error" });
    }

    if (data?.success) {
      navigate("/dashboard");
    }
  }, [responseError, data, navigate]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setError("");
      login(values);
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
            Sign in
          </Typography>
          {error?.message && (
            <Alert sx={{ mt: 2, width: "100%" }} severity="error">
              {error?.message && error?.message}
            </Alert>
          )}

          {location.state && (
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              onClose={() => setOpen(false)}
              autoHideDuration={5000}
            >
              <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
                {location.state}
              </Alert>
            </Snackbar>
          )}

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              variant="standard"
              label="Username or Email Address"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              id={formik.errors.username && "standard-error"}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <FormControl fullWidth sx={{ mt: 1 }} variant="standard">
              <InputLabel
                htmlFor="standard-adornment-password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                Password
              </InputLabel>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                id={formik.errors.password && "standard-error"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                id="passowrd-helper-text"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ borderRadius: "9999px", mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>
          </Box>
          <Link
            to="/lost-password"
            className="text-center no-underline text-blue-500"
          >
            <Typography variant="body1">Forgot password?</Typography>
          </Link>
        </Box>
      </Container>
    </Grid>
  );
}

export default Login;
