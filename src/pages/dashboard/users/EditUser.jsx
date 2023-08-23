import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function EditUser() {
  const { userId } = useParams();
  return (
    <Box>
      <Typography variant="h5">Edit User</Typography>{" "}
      <Typography variant="h5">User ID : {userId} </Typography>
    </Box>
  );
}

export default EditUser;
