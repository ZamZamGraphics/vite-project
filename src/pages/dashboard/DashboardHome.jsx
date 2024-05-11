import { Box, FormControl, Grid, InputLabel, Typography } from "@mui/material";
import StudentIcon from "../../assets/images/StudentIcon.svg";
import AdmissionIcon from "../../assets/images/Admission.svg";
import BatchIcon from "../../assets/images/BatchIcon.svg";
import PaymentIcon from "../../assets/images/PaymentIcon.svg";
import DueIcon from "../../assets/images/DueIcon.svg";
import CardItem from "./CardItem";

function DashboardHome() {
  return (
    <Box>
      <Grid container spacing={2} autoComplete="off">
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            Welcome, Admin
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <InputLabel>Select Date</InputLabel>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <CardItem
            icon={StudentIcon}
            iconBgColor="#EBF3FF"
            title="Total Students"
            value="1585"
            color="#1F69D8"
          />
        </Grid>
        <Grid item xs={3}>
          <CardItem
            icon={AdmissionIcon}
            iconBgColor="#E2FAE6"
            title="New Admission"
            value="1585"
            color="#47B259"
          />
        </Grid>
        <Grid item xs={3}>
          <CardItem
            icon={BatchIcon}
            iconBgColor="#FAEEE6"
            title="Total Batches"
            value="1570"
            color="#CC711E"
          />
        </Grid>
        <Grid item xs={3}>
          <CardItem
            icon={PaymentIcon}
            iconBgColor="#E6F5FA"
            title="Total Payment"
            value="1570 Tk"
            color="#28ABAB"
          />
        </Grid>
        <Grid item xs={3}>
          <CardItem
            icon={DueIcon}
            iconBgColor="#FFEDEA"
            title="Total Dues"
            value="1570 Tk"
            color="#F4492D"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardHome;
