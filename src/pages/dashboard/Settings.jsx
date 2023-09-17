import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function Settings() {
  const [error, setError] = useState({ message: "Sonthing Wrong!" });
  const [siteTitle, setSiteTitle] = useState("AL MADINA IT");
  const [tagline, setTagline] = useState("");
  const [email, setEmail] = useState("");
  const [perPage, setPerPage] = useState("");
  const [emailChecked, setEmailChecked] = useState(true);
  const [smsChecked, setSmsChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = {
      siteTitle,
      tagline,
      email,
      perPage,
      emailChecked,
      smsChecked,
    };
    console.log(data);
  };
  return (
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
        Settings
      </Typography>
      {error?.message && (
        <Alert sx={{ mb: 3 }} variant="filled" severity="error">
          {error?.message && error?.message}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3} autoComplete="off">
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Site Title"
              id="siteTitle"
              name="siteTitle"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              error={error?.siteTitle && true}
              helperText={error?.siteTitle && error?.siteTitle?.msg}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Tagline"
              id="tagline"
              name="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              error={error?.tagline && true}
              helperText={error?.tagline && error?.tagline?.msg}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              size="small"
              label="Admin E-mail"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error?.email && true}
              helperText={error?.email && error?.email?.msg}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              size="small"
              label="Show Page"
              id="perPage"
              name="perPage"
              value={perPage}
              onChange={(e) => setPerPage(e.target.value)}
              error={error?.perPage && true}
              helperText={error?.perPage && error?.perPage?.msg}
            />
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={emailChecked}
                    onChange={(e) => setEmailChecked(e.target.checked)}
                  />
                }
                label="Email Notification"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={smsChecked}
                    onChange={(e) => setSmsChecked(e.target.checked)}
                  />
                }
                label="SMS Notification"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              type="submit"
              sx={{ borderRadius: "9999px", mt: 3, mb: 2 }}
              disableElevation
              variant="contained"
              // disabled={isLoading}
            >
              Setting Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Settings;
