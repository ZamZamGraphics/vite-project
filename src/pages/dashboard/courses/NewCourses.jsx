import {
  Box,
  MenuItem,
  FormHelperText,
  Grid,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useAddCourseMutation } from "../../../redux/features/courses/coursesApi";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    background: `${theme.palette.mode === "dark" ? grey[900] : "#fff"}`,
  },
}));

function NewCourses() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [courseType, setCourseType] = useState("");
  const [duration, setDuration] = useState("");
  const [courseFee, setCourseFee] = useState("");

  const [addCourse, { data, isLoading, error: responseError }] =
    useAddCourseMutation();

  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data?.errors);
    }

    if (responseError?.error) {
      setError({ message: "Network Error" });
    }

    if (data) {
      setSuccess(data.message);
      reset();
    }
  }, [responseError, data]);

  const reset = () => {
    setName("");
    setSlug("");
    setDescription("");
    setCourseType("");
    setDuration("");
    setCourseFee("");
  };

  const handleChange = (name, value) => {
    if (name == "name") {
      setName(value);
    }
    setSlug(value.split(" ").join("-").toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const data = {
      name,
      slug,
      description,
      courseType,
      duration,
      courseFee,
    };
    addCourse(data);
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
              label="Course name"
              name="name"
              value={name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={error.name && true}
              helperText={error.name && error.name.msg}
            />
            <FormHelperText>
              The name is how it appears on your site.
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              size="small"
              fullWidth
              label="Course slug"
              name="slug"
              value={slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              error={error.slug && true}
              helperText={error.slug && error.slug.msg}
            />
            <FormHelperText>
              The “slug” is the URL-friendly version of the name. It is usually
              all lowercase and contains only letters, numbers, and hyphens.
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              sx={{
                backgroundColor: "input.background",
              }}
              multiline
              rows={5}
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={error.description && true}
              helperText={error.description && error.description.msg}
            />
            <FormHelperText>
              The description is not prominent by default.
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              select
              fullWidth
              size="small"
              label="Course Type"
              name="type"
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
              error={error.courseType && true}
              helperText={error.courseType && error.courseType.msg}
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
              size="small"
              fullWidth
              label="Course Duration"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              error={error.duration && true}
              helperText={error.duration && error.duration.msg}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              size="small"
              fullWidth
              label="Course Fee"
              name="courseFee"
              value={courseFee}
              onChange={(e) => setCourseFee(e.target.value)}
              error={error.courseFee && true}
              helperText={error.courseFee && error.courseFee.msg}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              sx={{ borderRadius: "9999px", mt: 2, mb: 2 }}
              disableElevation
              variant="contained"
              disabled={isLoading}
            >
              Add New Course
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default NewCourses;

const type = [
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
