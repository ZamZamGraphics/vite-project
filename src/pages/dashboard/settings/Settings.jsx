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
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useEditSettingsMutation,
  useGetSettingsQuery,
} from "../../../redux/features/settings/settingsApi";
import Loading from "./Loading";

export default function Settings() {
  const { data, isLoading, isError } = useGetSettingsQuery();

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Alert severity="error">Internal Server Error</Alert>;
  } else if (!isLoading && !isError && data) {
    content = <UpdateSettings data={data} />;
  }
  return content;
}

function UpdateSettings({ data }) {
  const [initial] = data;

  const [siteTitle, setSiteTitle] = useState(initial.siteTitle);
  const [tagline, setTagline] = useState(initial.tagline);
  const [email, setEmail] = useState(initial.email);
  const [perPage, setPerPage] = useState(initial.perPage);
  const [emailChecked, setEmailChecked] = useState(initial.emailChecked);
  const [smsChecked, setSmsChecked] = useState(initial.smsChecked);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [
    editSettings,
    { data: responseData, isLoading, error: responseError },
  ] = useEditSettingsMutation();

  const location = useLocation();

  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data?.errors);
    }

    if (responseError?.error) {
      setError({ message: "Network Error" });
    }

    if (responseData) {
      setSuccess(responseData.message);
    }

    if (responseData && responseData?.newEmail) {
      setSuccess(`${responseData.message} - ${responseData.newEmail}`);
    }

    if (location.state) {
      {
        location.state.success
          ? setSuccess(location.state.message)
          : setError({ message: location.state.message });
      }
    }
    location.state = null;
  }, [responseError, responseData, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const data = {
      siteTitle,
      tagline,
      email,
      perPage,
      emailChecked,
      smsChecked,
    };
    editSettings({ id: initial._id, data });
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
          Settings
        </Typography>

        {success && (
          <Alert sx={{ mb: 3 }} variant="filled" severity="success">
            {success}
          </Alert>
        )}

        {error?.message && (
          <Alert sx={{ mb: 3 }} variant="filled" severity="error">
            {error.message}
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
                disabled={isLoading}
              >
                Setting Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
