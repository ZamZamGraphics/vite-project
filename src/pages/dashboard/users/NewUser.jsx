import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
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
import { useAddUserMutation } from "../../../redux/features/users/usersApi";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarImage, setAvatarImage] = useState("");

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    status: "Unverified",
    role: "User",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [addUser, { data, isLoading, error: responseError }] =
    useAddUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data?.errors);
    }

    if (responseError?.error) {
      setError({ message: "Network Error" });
    }

    if (data?.success) {
      navigate("/dashboard/users", { state: data?.message });
    }
  }, [responseError, data, navigate]);

  const handleChange = (name, value) => {
    setUser({
      ...user,
      fullname: `${firstName} ${lastName}`,
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
    const form = new FormData();
    form.append("fullname", user.fullname);
    form.append("username", user.username);
    form.append("email", user.email);
    form.append("password", user.password);
    form.append("status", user.status);
    form.append("role", user.role);
    form.append("avatar", avatar);
    addUser(form);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, maxWidth: 1024 }}>
        <Typography variant="h5" mb={2}>
          Add New User
        </Typography>
        {error?.message && (
          <Alert className="mb-3" variant="filled" severity="error">
            {error?.message && error?.message}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} autoComplete="off">
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={user.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={user.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={user.username}
                onChange={(e) => handleChange("username", e.target.value)}
                id={error?.username && "username-error"}
                error={error?.username && true}
                helperText={error?.username && error?.username?.msg}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                type="email"
                fullWidth
                label="Email"
                name="email"
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
                id={error?.email && "email-error"}
                error={error?.email && true}
                helperText={error?.email && error?.email?.msg}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl
                fullWidth
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
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                select
                fullWidth
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
            <Grid item xs={12}>
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
                  <Avatar
                    alt={user.fullname}
                    src={avatarImage}
                    sx={{ width: 80, height: 80 }}
                  />
                </IconButton>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                className="rounded-full"
                variant="contained"
                disabled={isLoading}
              >
                Add New User
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

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
