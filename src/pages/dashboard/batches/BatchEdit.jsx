import {
  Box,
  MenuItem,
  FormHelperText,
  Grid,
  TextField,
  Button,
  Alert,
  Autocomplete,
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
import {
  useGetBatchQuery,
  useEditBatchMutation,
} from "../../../redux/features/batches/batchesApi";
import { useLocation } from "react-router-dom";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    background: `${theme.palette.mode === "dark" ? grey[900] : "#fff"}`,
  },
}));

function BatchEdit() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const id = query.get("id");
  const { data: initialBatch } = useGetBatchQuery(id);

  const [studentId, setStudentId] = useState(initialBatch.student);
  const [startDate, setStartDate] = useState(initialBatch.startDate);
  const [classDays, setClassDays] = useState(initialBatch.classDays);
  const [classTime, setClassTime] = useState(initialBatch.classTime);

  useEffect(() => {
    if (initialBatch) {
      setStudentId(initialBatch.student);
      setStartDate(initialBatch.startDate);
      setClassDays(initialBatch.classDays);
      setClassTime(initialBatch.classTime);
    }
  }, [initialBatch]);

  const [editBatch, { data: batch, isLoading, error: responseError }] =
    useEditBatchMutation();

  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data?.errors);
    }

    if (responseError?.error) {
      setError({ message: "Network Error" });
    }

    if (batch) {
      setSuccess(batch.message);
    }
  }, [responseError, batch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const data = {
      student: studentId,
      startDate,
      classDays,
      classTime,
    };
    editBatch({ id, data });
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
              disabled
              value={initialBatch.batchNo}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              size="small"
              fullWidth
              label="Batch No"
              disabled
              value={`${initialBatch.course.name} (${initialBatch.course.courseType})`}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              size="small"
              id="studentID"
              options={studentId}
              getOptionLabel={(option) => option.studentId}
              isOptionEqualToValue={(option, value) =>
                option.studentId === value.studentId
              }
              defaultValue={[studentId[0]]}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              error={error.student && true}
              // helperText={error.student && error.student.msg}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Student ID" />
              )}
              sx={{
                backgroundColor: "input.background",
              }}
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
                value={dayjs(startDate)}
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
                // defaultValue={dayjs(new Date(classTime)).format("h:mm A")}
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

export default BatchEdit;

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
