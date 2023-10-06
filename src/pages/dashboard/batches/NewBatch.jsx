import {
  Box,
  MenuItem,
  FormHelperText,
  Grid,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useGetCoursesQuery } from "../../../redux/features/courses/coursesApi";
import { useAddBatchMutation } from "../../../redux/features/batches/batchesApi";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    background: `${theme.palette.mode === "dark" ? grey[900] : "#fff"}`,
  },
}));

function NewBatch() {
  const [request, setRequest] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [courseType, setCourseType] = useState("-1");
  const [courseName, setCourseName] = useState("-1");
  const [studentId, setStudentId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [classDays, setClassDays] = useState("-1");
  const [classTime, setClassTime] = useState("");

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
      reset();
    }
  }, [responseError, batch]);

  const reset = () => {
    setBatchNo("");
    setCourseType("-1");
    setCourseName("-1");
    setStudentId("");
    setStartDate("");
    setClassDays("-1");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    let course = null;
    if (courseName !== "-1") {
      course = courseName;
    }
    const data = {
      batchNo,
      course,
      student: studentId,
      startDate,
      classDays,
      classTime,
    };
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
            <FormHelperText>
              The Student IDs should be entered with &quot;, &quot; commas.
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Approximate Start Date"
                views={["day", "month", "year"]}
                format="DD-MM-YYYY"
                name="startDate"
                value={startDate}
                onChange={(value) => setStartDate(dayjs(value.$d).format())}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    error: error.startDate ? true : false,
                    helperText: error.startDate && error.startDate.msg,
                  },
                }}
                sx={{ mt: 1, backgroundColor: "input.background" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Class Time"
                // views={["hours", "minutes"]}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                }}
                name="classTime"
                value={classTime}
                onChange={(value) =>
                  setClassTime(dayjs(value.$d).format("h:mm A"))
                }
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    error: error.classTime ? true : false,
                    helperText: error.classTime && error.classTime.msg,
                  },
                }}
                sx={{ mt: 1, backgroundColor: "input.background" }}
              />
            </LocalizationProvider>
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
