import { Alert, AlertTitle } from "@mui/material";

function ErrorPage() {
  return (
    <Alert severity="error">
      <AlertTitle>500 Internal Server Error</AlertTitle>
    </Alert>
  );
}

export default ErrorPage;
