import {
  Alert,
  // Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAddBatchMutation } from "../../../redux/features/batches/batchesApi";
import { useGetCoursesQuery } from "../../../redux/features/courses/coursesApi";
import { useGetStudentsQuery } from "../../../redux/features/students/studentsApi";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    background: `${theme.palette.mode === "dark" ? grey[900] : "#fff"}`,
  },
}));

const ITEM_HEIGHT = 36;
const MOBILE_ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MENU_ITEMS = 6; // change this number to see the effect

function NewBatch() {
  const [request, setRequest] = useState(false);
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [courseType, setCourseType] = useState("-1");
  const [courseName, setCourseName] = useState("-1");
  const [studentId, setStudentId] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [classDays, setClassDays] = useState("-1");
  const [classTime, setClassTime] = useState("-1");
  
  const { data: std } = useGetStudentsQuery(`?limit=20&search=${search}`);
  const { data } = useGetCoursesQuery(courseType, { skip: !request });

  const [addBatch, { data: batch, isLoading, error: responseError }] =
    useAddBatchMutation();

  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data?.errors);
    }

    if (responseError?.error) {
      setError({ message: "Network Error" });
    }

    if (batch) {
      setSuccess(batch.message);
      // reset();
    }
  }, [responseError, batch]);

  const reset = () => {
    setBatchNo("");
    setCourseType("-1");
    setCourseName("-1");
    setStudents([]);
    setStudentId([]);
    setStartDate("");
    setClassDays("-1");
    setClassTime("-1");
  };
  
  useEffect(() => {
    if (std?.length > 0) {
      if (std[0].students.length > 0) {
        setStudents(std[0].students.map((std) => std.studentId ))
      }
    }
  },[std])

  let courseList = [{ value: "-1", label: "Select Course Name" }];
  if (data) {
    courseList = data?.courses.map((course) => {
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

  // const handleStudentId = (value) => {
  //   setStudentId(value.map((std) => std));
  // };

  // console.log(studentId)

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    let course = null;
    if (courseName !== "-1") {
      course = courseName;
    }

    let days = null;
    if (classDays !== "-1") {
      days = classDays;
    }

    let time = null;
    if (classTime !== "-1") {
      time = classTime;
    }
    const data = {
      batchNo,
      course,
      student: studentId.split(", ").toString(),
      startDate: startDate ? dayjs(startDate).format() : "",
      classDays: days,
      classTime: time,
    };
    // console.log(data)
    addBatch(data);
  };

  return (
    <>
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
        <Grid container spacing={2} autoComplete="off">
          <Grid item xs={12}>
            <StyledTextField
              size="small"
              fullWidth
              label="Batch No"
              name="batchNo"
              value={batchNo}
              onChange={(e) => setBatchNo(e.target.value)}
              error={error.batchNo && true}
              helperText={error.batchNo && error.batchNo.msg}
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
            {/* <Autocomplete
              multiple
              size="small"
              id="studentID"
              getOptionLabel={(option) => option}
              options={students}
              value={studentId}
              onChange={(e, data) => handleStudentId(data)}
              onInputChange={(event, newInputValue) => setSearch(newInputValue)}
              isOptionEqualToValue={(option, value) => option === value}
              filterSelectedOptions
              sx={{ backgroundColor: "input.background" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Student ID"
                  error={error.student && true}
                />
              )}
            />
            <FormHelperText error={error.student && true}>
              {error.student && error.student.msg}
            </FormHelperText> */}
            <StyledTextField
              size="small"
              fullWidth
              label="Student ID"
              name="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              error={error.student && true}
              helperText={error.student && error.student.msg}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Approximate Start Date"
                // views={["day", "month", "year"]}
                format="DD-MM-YYYY"
                name="startDate"
                value={startDate}
                onChange={(value) => setStartDate(value)}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    error: error.startDate ? true : false,
                  },
                }}
                sx={{ mt: 1, backgroundColor: "input.background" }}
              />
            </LocalizationProvider>
            {error.startDate && (
              <FormHelperText error>{error.startDate.msg}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              select
              fullWidth
              size="small"
              label="Class Days"
              name="classDays"
              value={classDays}
              onChange={(e) => setClassDays(e.target.value)}
              error={error.classDays && true}
              helperText={error.classDays && error.classDays.msg}
            >
              {days.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </StyledTextField>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small" error={error.classTime && true}>
              <InputLabel>Class Time</InputLabel>
              <Select
                sx={{ mt: 1, backgroundColor: "input.background" }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: {
                        xs: MOBILE_ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
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
          <Grid item xs={12}>
            <Button
              type="submit"
              sx={{ borderRadius: "9999px", mt: 2, mb: 2 }}
              disableElevation
              variant="contained"
              disabled={isLoading}
            >
              Add New Batch
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default NewBatch;

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

const days = [
  { value: "-1", label: "Select Days" },
  {
    value: "Sat, Mon, Wed",
    label: "Sat, Mon, Wed",
  },
  {
    value: "Sun, Tues, Thurs",
    label: "Sun, Tues, Thurs",
  },
  {
    value: "Every day",
    label: "Every day",
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
