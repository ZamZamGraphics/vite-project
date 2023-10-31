import {
  Box,
  Grid,
  Typography,
  MenuItem,
  FormHelperText,
  TextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Avatar,
  Stack,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Status from "../../../component/Status";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import {
  useGetCoursesQuery,
  useGetCourseQuery,
} from "../../../redux/features/courses/coursesApi";
import { useGetStudentByIdQuery } from "../../../redux/features/students/studentsApi";
import { useAddAdmissionMutation } from "../../../redux/features/admission/admissionApi";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    background: `${theme.palette.mode === "dark" ? grey[900] : "#fff"}`,
  },
}));

const ITEM_HEIGHT = 36;
const MOBILE_ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MENU_ITEMS = 6; // change this number to see the effect

function NewAdmission() {
  const [request, setRequest] = useState(false);
  const [stdRequest, setStdRequest] = useState(false);
  const [error, setError] = useState("");
  const [student, setStudent] = useState("");
  const [studentId, setStudentId] = useState("");
  const [courseType, setCourseType] = useState("-1");
  const [courseName, setCourseName] = useState("-1");
  const [discount, setDiscount] = useState("");
  const [payment, setPayment] = useState("");
  const [total, setTotal] = useState("");
  const [due, setDue] = useState("");
  const [nextPay, setNextPay] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [classTime, setClassTime] = useState("-1");

  const { data: std } = useGetStudentByIdQuery(studentId, {
    skip: !stdRequest,
  });

  const { data } = useGetCoursesQuery(courseType, { skip: !request });
  const { data: course } = useGetCourseQuery(courseName, {
    skip: !request,
  });

  const [addAdmission, { data: admission, isLoading, error: responseError }] =
    useAddAdmissionMutation();

  useEffect(() => {
    if (std) {
      setStudent(std);
    } else {
      setStudent("");
    }
  }, [std]);

  useEffect(() => {
    if (course) {
      const total = course.courseFee - discount;
      setTotal(total);
      setDue(total - payment);
    } else {
      setStudent("");
    }
  }, [course, discount, payment]);

  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data?.errors);
    }

    if (responseError?.error) {
      setError({ message: "Network Error" });
    }

    if (admission) {
      // success redirect to print page
      console.log(admission);
      reset();
    }
  }, [responseError, admission]);

  const reset = () => {
    setStudentId("");
    setCourseType("-1");
    setCourseName("-1");
    setDiscount("");
    setPayment("");
    setNextPay("");
    setBatchNo("");
    setClassTime("");
  };

  let courseList = [{ value: "-1", label: "Select Course Name" }];
  if (data) {
    const { courses } = data;
    courseList = courses.map((course) => {
      return {
        value: course._id,
        label: course.name,
      };
    });
    courseList.unshift({ value: "-1", label: "Select Course Name" });
  }

  const handleChange = (value) => {
    setCourseType(value);
    setRequest(true);
    setCourseName("-1");
  };

  const handleStudent = (stdId) => {
    setStudentId(stdId);
    setStdRequest(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    let course = null;
    if (courseName !== "-1") {
      course = courseName;
    }

    let time = null;
    if (classTime !== "-1") {
      time = classTime;
    }
    const data = {
      student: studentId,
      course,
      discount,
      payment,
      paymentType: "New",
      nextPay,
      batch: batchNo,
      timeSchedule: time,
    };
    addAdmission(data);
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "background.paper",
        borderRadius: "10px",
        boxShadow: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            New Admission
          </Typography>
          {error?.message && (
            <Alert sx={{ mb: 3 }} variant="filled" severity="error">
              {error.message}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2} autoComplete="off">
              <Grid item xs={12}>
                <StyledTextField
                  size="small"
                  fullWidth
                  label="Student ID"
                  name="studentId"
                  value={studentId}
                  onChange={(e) => handleStudent(e.target.value)}
                  error={error.student && true}
                  helperText={error.student && error.student.msg}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  select
                  fullWidth
                  size="small"
                  label="Course Type"
                  name="type"
                  value={courseType}
                  onChange={(e) => handleChange(e.target.value)}
                >
                  {type.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </StyledTextField>
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  select
                  fullWidth
                  size="small"
                  label="Course Name"
                  name="courseName"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  error={error.course && true}
                  helperText={error.course && error.course.msg}
                >
                  {courseList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </StyledTextField>
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  size="small"
                  fullWidth
                  label="Discount"
                  name="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  error={error.discount && true}
                  helperText={error.discount && error.discount.msg}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  size="small"
                  fullWidth
                  label="Payment"
                  name="payment"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  error={error.payment && true}
                  helperText={error.payment && error.payment.msg}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Next Payment Date"
                    // views={["day", "month", "year"]}
                    format="DD-MM-YYYY"
                    name="nextPay"
                    value={nextPay}
                    onChange={(value) => setNextPay(dayjs(value.$d).format())}
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        error: error.nextPay ? true : false,
                      },
                    }}
                    sx={{ mt: 1, backgroundColor: "input.background" }}
                  />
                </LocalizationProvider>
                {error.nextPay && (
                  <FormHelperText error>{error.nextPay.msg}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  size="small"
                  fullWidth
                  label="Batch No"
                  name="batchNo"
                  value={batchNo}
                  onChange={(e) => setBatchNo(e.target.value)}
                  error={error.batch && true}
                  helperText={error.batch && error.batch.msg}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  size="small"
                  error={error.classTime && true}
                >
                  <InputLabel>Class Time</InputLabel>
                  <Select
                    sx={{ mt: 1, backgroundColor: "input.background" }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: {
                            xs:
                              MOBILE_ITEM_HEIGHT * MENU_ITEMS +
                              ITEM_PADDING_TOP,
                            sm: ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                          },
                        },
                      },
                    }}
                    label="Class Time"
                    name="classTime"
                    value={classTime}
                    onChange={(e) => setClassTime(e.target.value)}
                  >
                    {times.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {error.classTime && error.classTime.msg}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                  type="submit"
                  sx={{ borderRadius: "9999px", mt: 2, mb: 2 }}
                  disableElevation
                  variant="contained"
                  disabled={isLoading}
                >
                  Add New Admission
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <TableContainer align="center">
            <Table size="small" sx={{ maxWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Stack
                      direction="column"
                      alignItems="center"
                      spacing={2}
                      mb={2}
                    >
                      <Avatar
                        src={`${import.meta.env.VITE_API_URL}/upload/${
                          student?.avatar
                        }`}
                        sx={{ width: 60, height: 60 }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="40%" align="right">
                    <Typography variant="h6">Student ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{student?.studentId}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Student Status</TableCell>
                  <TableCell>
                    {student?.status && <Status status={student?.status} />}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Student Name</TableCell>
                  <TableCell>{student?.fullName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Student Mobile</TableCell>
                  <TableCell>{student?.phone?.[0]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Course Name</TableCell>
                  <TableCell>{course?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Course Fee</TableCell>
                  <TableCell>{course?.courseFee}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell>{discount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Total</TableCell>
                  <TableCell>{total}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Payment</TableCell>
                  <TableCell>{payment}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Due</TableCell>
                  <TableCell>{due}</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewAdmission;

const type = [
  { value: "-1", label: "Select Course Type" },
  {
    value: "Regular",
    label: "Regular",
  },
  {
    value: "Private",
    label: "Private",
  },
  {
    value: "Diploma in Computer",
    label: "Diploma in Computer",
  },
];

const times = [
  { value: "-1", label: "Select Time" },
  { value: "10:00 AM", label: "10:00 AM" },
  { value: "10:30 AM", label: "10:30 AM" },
  { value: "11:00 AM", label: "11:00 AM" },
  { value: "11:30 AM", label: "11:30 AM" },
  { value: "12:00 PM", label: "12:00 PM" },
  { value: "12:30 PM", label: "12:30 PM" },
  { value: "1:00 PM", label: "1:00 PM" },
  { value: "1:30 PM", label: "1:30 PM" },
  { value: "2:00 PM", label: "2:00 PM" },
  { value: "2:30 PM", label: "2:30 PM" },
  { value: "3:00 PM", label: "3:00 PM" },
  { value: "3:30 PM", label: "3:30 PM" },
  { value: "4:00 PM", label: "4:00 PM" },
  { value: "4:30 PM", label: "4:30 PM" },
  { value: "5:00 PM", label: "5:00 PM" },
  { value: "5:30 PM", label: "5:30 PM" },
  { value: "6:00 PM", label: "6:00 PM" },
  { value: "6:30 PM", label: "6:30 PM" },
  { value: "7:00 PM", label: "7:00 PM" },
  { value: "7:30 PM", label: "7:30 PM" },
  { value: "8:00 PM", label: "8:00 PM" },
  { value: "8:30 PM", label: "8:30 PM" },
  { value: "9:00 PM", label: "9:00 PM" },
  { value: "9:30 PM", label: "9:30 PM" },
  { value: "10:00 PM", label: "10:00 PM" },
];
