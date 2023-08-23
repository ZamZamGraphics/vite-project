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
import { useState } from "react";
import AvatarUpload from "./AvatarUpload";

export default function NewUser() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <Box sx={{ flexGrow: 1, maxWidth: 1024 }}>
        <Typography variant="h5" mb={2}>
          Add New User
        </Typography>
        <Alert className="mb-3" severity="error">
          Server side Error! Status : 500
        </Alert>
        <Grid
          container
          component="from"
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <Grid item xs={12} sm={12} md={6}>
            <TextField fullWidth label="First Name" id="firnsName" />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField fullWidth label="Last Name" id="lastName" />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              required
              fullWidth
              label="Username"
              id="userName"
              error
              helperText="Username required"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              required
              type="email"
              fullWidth
              label="Email"
              id="userEmail"
              error
              helperText="Invalid Email"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth variant="outlined" error>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                required
                type={showPassword ? "text" : "password"}
                label="Password"
                id="password"
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
              <FormHelperText id="passowrd-helper-text">
                Password required
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              id="userRole"
              select
              fullWidth
              label="User Role"
              defaultValue="Editor"
            >
              {userRole.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" className="rounded-full" variant="contained">
              Add New User
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, maxWidth: 150 }}>
        <AvatarUpload />
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
    value: "Editor",
    label: "Editor",
  },
];
