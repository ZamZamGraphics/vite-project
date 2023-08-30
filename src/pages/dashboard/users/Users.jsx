import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Users() {
  const [open, setOpen] = useState(true);

  const location = useLocation();

  return (
    <Box>
      <Typography variant="h5">All Users</Typography>

      {location.state && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={5000}
        >
          <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
            {location.state}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

export default Users;
