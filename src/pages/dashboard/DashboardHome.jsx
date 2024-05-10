import { Box, Grid, Typography } from "@mui/material";
import StudentIcon from "../../assets/images/graduation-hat.svg";
import DashboardCard from "./DashboardCard";

function DashboardHome() {
  return (
    <Box>
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Welcome, Admin
      </Typography>
      <Grid container spacing={2} autoComplete="off">
        <Grid item xs={2}>
          <DashboardCard 
          icon={StudentIcon} 
          iconBgColor="#EBF3FF"
          title="Total Students"
          value="1570"
          color="#1F69D8"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardHome;
