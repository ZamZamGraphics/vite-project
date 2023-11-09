import {
  Box,
  MenuItem,
  FormHelperText,
  Grid,
  TextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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

const ITEM_HEIGHT = 36;
const MOBILE_ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MENU_ITEMS = 6; // change this number to see the effect

function BatchEdit() {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const id = query.get("id");
  const { data: batch } = useGetBatchQuery(id);

  let editBatch;

  if (batch) {
    editBatch = <BatchEditForm initialBatch={batch} />;
  }
  return editBatch;
}
export default BatchEdit;

function BatchEditForm({ initialBatch }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    let days = null;
    if (classDays !== "-1") {
      days = classDays;
    }

    let time = null;
    if (classTime !== "-1") {
      time = classTime;
    }

    const data = {
      student: studentId.toString(),
      startDate,
      classDays: days,
      classTime: time,
    };
    editBatch({ id: initialBatch._id, data });
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
              value={studentId}
              options={studentId}
              getOptionLabel={(option) => option}
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
              {error.student
                ? error.student.msg
                : "The Student IDs should be entered with &quot;, &quot; commas."}
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Approximate Start Date"
                // views={["day", "month", "year"]}
                format="DD-MM-YYYY"
                name="startDate"
                value={dayjs(startDate)}
                onChange={(value) => setStartDate(dayjs(value.$d).format())}
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
