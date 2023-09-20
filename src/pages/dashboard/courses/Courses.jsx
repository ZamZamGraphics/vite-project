import { Box, Grid, Typography } from "@mui/material";
import NewCourses from "./NewCourses";

function Courses() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Courses
      </Typography>
      <Grid container spacing={2}>
        <NewCourses />
        <Grid item xs={8}>
          <Typography variant="h4">All Courses Table</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Courses;
