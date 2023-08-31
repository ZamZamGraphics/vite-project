import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "background",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">
        The page you’re looking for doesn’t exist.
      </Typography>
      <Link to="/">
        <Button
          variant="contained"
          sx={{ borderRadius: "9999px", mt: 3, mb: 2 }}
        >
          Back Home
        </Button>
      </Link>
    </Box>
  );
}

export default NotFoundPage;
