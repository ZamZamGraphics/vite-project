import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import AdmissionIcon from "../../assets/images/Admission.svg";
import BatchIcon from "../../assets/images/BatchIcon.svg";
import DueIcon from "../../assets/images/DueIcon.svg";
import PaymentIcon from "../../assets/images/PaymentIcon.svg";
import StudentIcon from "../../assets/images/StudentIcon.svg";
import { useGetAdmissionsQuery } from "../../redux/features/admission/admissionApi";
import { useGetBatchesQuery } from "../../redux/features/batches/batchesApi";
import { useGetStudentsQuery } from "../../redux/features/students/studentsApi";
import CardItem from "./CardItem";

function DashboardHome() {
  const [sortBy, SetSortBy] = useState("today");
  const [from, SetFrom] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
  const [month, SetMonth] = useState(dayjs().month());
  const [year, SetYear] = useState(dayjs().year());
  
  const [totalStudent, SetTotalStudent] = useState(0);
  const [totalAdmission, SetTotalAdmission] = useState(0);
  const [totalBatches, SetTotalBatches] = useState(0);
  const [totalPayment, SetTotalPayment] = useState(0);
  const [totalDues, SetTotalDues] = useState(0);
  
  const to = dayjs(new Date()).format("YYYY-MM-DD");
  const { data: students } = useGetStudentsQuery( `?limit=999999&from=${from}&to=${to}` );
  const { data: admissions } = useGetAdmissionsQuery( `?limit=999999&search=New&from=${from}&to=${to}` );
  const { data: batches } = useGetBatchesQuery( `?limit=999999&from=${from}&to=${to}` );

  const handleChangeSort = (e) => {
    SetSortBy(e.target.value)
  }

  useEffect(() => {
    if(students?.length > 0){
      SetTotalStudent(students.length);
      const dues = students.reduce((total, std) => {
        return total + std?.totalDues;
      }, 0)
      SetTotalDues(dues);
    } else {
      SetTotalStudent(0);
      SetTotalDues(0);
    }
    if(admissions?.length > 0){
      SetTotalAdmission(admissions.length);
      const payment = admissions.reduce((total, admission) => {
        return total + admission?.payableAmount;
      }, 0)
      SetTotalPayment(payment - totalDues);
    } else {
      SetTotalAdmission(0);
      SetTotalPayment(0);
    }
    if(batches?.length > 0) {
      SetTotalBatches(batches.length);
    } else {
      SetTotalBatches(0);
    }
  },[students, admissions, totalDues, batches])
  
  useEffect(() => {
    if(sortBy === "today"){
      SetFrom(dayjs(new Date()).format("YYYY-MM-DD"))
    }else if (sortBy === "month") {
      SetMonth(dayjs().month())
      SetFrom(dayjs(`${year}-${month+1}-01`).format("YYYY-MM-DD"))
    }else if (sortBy === "year") {
      SetYear(dayjs().year())
      SetFrom(dayjs(`${year}-01-01`).format("YYYY-MM-DD"))
    }
  },[sortBy, month, year])

  return (
    <Box>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            Welcome, Admin
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2} sx={{textAlign:"end", mb:3}}>
          <FormControl 
            fullWidth
            sx={{ 
              m: 1, 
              bgcolor:"background.paper", 
              textAlign:"start" 
            }} 
            size="small"
          >
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              label="Sort by"
              onChange={handleChangeSort}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }} >
        <Grid item xs={12} sm={6} md>
          <CardItem
            icon={StudentIcon}
            iconBgColor="#EBF3FF"
            title="Total Students"
            value={totalStudent}
            color="#1F69D8"
          />
        </Grid>
        <Grid item xs={12} sm={6} md>
          <CardItem
            icon={AdmissionIcon}
            iconBgColor="#E2FAE6"
            title="New Admission"
            value={totalAdmission}
            color="#47B259"
          />
        </Grid>
        <Grid item xs={12} sm={6} md>
          <CardItem
            icon={BatchIcon}
            iconBgColor="#FAEEE6"
            title="Total Batches"
            value={totalBatches}
            color="#CC711E"
          />
        </Grid>
        <Grid item xs={12} sm={6} md>
          <CardItem
            icon={PaymentIcon}
            iconBgColor="#E6F5FA"
            title="Total Payment"
            value={totalPayment + " Tk"}
            color="#28ABAB"
          />
        </Grid>
        <Grid item xs={12} sm={6} md>
          <CardItem
            icon={DueIcon}
            iconBgColor="#FFEDEA"
            title="Total Dues"
            value={totalDues + " Tk"}
            color="#F4492D"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardHome;
