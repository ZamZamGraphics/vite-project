import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Avatar } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useEditUserMutation } from "../../../redux/features/users/usersApi";
import Status from "../../../component/Status";

const EditForm = ({ title, id, userEdit }) => {
  const {
    fullname: initialFullname,
    username: initialUsername,
    email: initialEmail,
    status: initialStatus,
    role: initialRole,
    avatar: initialAvatar,
  } = userEdit;

  const [user, setUser] = useState({
    fullname: initialFullname,
    email: initialEmail,
    password: "",
    status: initialStatus,
    role: initialRole,
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarImage, setAvatarImage] = useState(
    `${import.meta.env.VITE_API_URL}/upload/${initialAvatar}`
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [editUser, { data, isLoading, error: responseError }] =
    useEditUserMutation();

  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data?.errors);
    }

    if (responseError?.error) {
      setError({ message: "Network Error" });
    }

    if (data?.success) {
      setSuccess(data.message);
    }

    if (data?.success && data?.newEmail) {
      setSuccess(`${data.message} - ${data.newEmail}`);
    }
  }, [responseError, data]);

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const changeAvarar = (file) => {
    setAvatar(file);
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const form = new FormData();
    form.append("fullname", user.fullname);
    form.append("email", user.email);
    if (user.password) {
      form.append("password", user.password);
    }
    form.append("status", user.status);
    form.append("role", user.role);
    form.append("avatar", avatar);
    editUser({ id, data: form });
  };

  return (
    <Grid container alignItems="center" direction="column">
      <Box
        sx={{
          padding: 4,
          maxWidth: 800,
          backgroundColor: "background.paper",
          borderRadius: "10px",
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" align="center" mb={2}>
          {title}
        </Typography>
        {success && (
          <Alert mb={3} severity="success">
            {success}
          </Alert>
        )}
        {error?.message && (
          <Alert mb={3} variant="filled" severity="error">
            {error.message}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} autoComplete="off">
            <Grid item xs={12} align="center">
              <input
                type="file"
                hidden
                accept="image/*"
                name="avatar"
                id="avatarUpload"
                onChange={(e) => changeAvarar(e.target.files[0])}
              />
              <label htmlFor="avatarUpload">
                <IconButton component="span">
                  <Avatar src={avatarImage} sx={{ width: 100, height: 100 }} />
                </IconButton>
              </label>
            </Grid>
            <Grid item align="center" xs={12}>
              <Status status={user.status} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Full Name"
                name="fullname"
                value={user.fullname}
                onChange={(e) => handleChange("fullname", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled
                size="small"
                label="Username"
                value={initialUsername}
                id={error?.username && "username-error"}
                error={error?.username && true}
                helperText={error?.username && error?.username?.msg}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                fullWidth
                size="small"
                label="Email"
                name="email"
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
                id={error?.email && "email-error"}
                error={error?.email && true}
                helperText={error?.email && error?.email?.msg}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                error={error?.password && true}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  value={user.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  id={error?.password && "password-error"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {error?.password && (
                  <FormHelperText id="passowrd-error">
                    {error?.password?.msg}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                size="small"
                label="User Role"
                name="role"
                value={user.role}
                onChange={(e) => handleChange("role", e.target.value)}
                id={error?.role && "userRole-error"}
                error={error?.role && true}
                helperText={error?.role && error?.role?.msg}
              >
                {userRole.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                type="submit"
                sx={{ borderRadius: "9999px", mt: 3, mb: 2 }}
                variant="contained"
                disabled={isLoading}
              >
                User Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};
const userRole = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "User",
    label: "User",
  },
];
export default EditForm;
