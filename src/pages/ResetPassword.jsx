import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import logoDark from "../assets/images/logo-dark.svg";
import logoLight from "../assets/images/logo-light.svg";
import { useResetPasswordMutation } from "../redux/features/forgotPassword/forgotPasswordApi";

const PasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
});

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [error, setError] = useState("");
  const darkMode = useSelector((state) => state.theme.darkMode);
  const logo = darkMode ? logoLight : logoDark;

  const [resetPassword, { data, isLoading, error: responseError }] =
    useResetPasswordMutation();

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data.errors);
    }

    if (responseError?.error) {
      setError({ message: "Network Error" });
    }

    if (data?.success) {
      navigate("/login", { state: data?.message });
    }
  }, [responseError, data, navigate]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: PasswordSchema,
    onSubmit: (values) => {
      setError("");
      const data = {
        ...values,
        queryURL: location.search,
      };
      resetPassword(data);
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
          {error?.message && (
            <Alert sx={{ mt: 2, width: "100%" }} severity="error">
              {error?.message && error?.message}
            </Alert>
          )}
          {error?.password && (
            <Alert sx={{ mt: 2, width: "100%" }} severity="error">
              {error?.password.msg}
            </Alert>
          )}
          {error?.confirmPassword && (
            <Alert sx={{ mt: 2, width: "100%" }} severity="error">
              {error?.confirmPassword.msg}
            </Alert>
          )}
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
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
            <FormControl fullWidth sx={{ mt: 1 }} variant="standard">
              <InputLabel
                htmlFor="standard-adornment-confirm-password"
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
              >
                Confirm Password
              </InputLabel>
              <Input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                id={formik.errors.confirmPassword && "standard-error"}
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
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
              >
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ borderRadius: "9999px", mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Reset Password
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

export default ResetPassword;
