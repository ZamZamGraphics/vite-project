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
import {
  useGetCourseQuery,
  useEditCourseMutation,
} from "../../../redux/features/courses/coursesApi";
import { useLocation } from "react-router-dom";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    background: `${theme.palette.mode === "dark" ? grey[900] : "#fff"}`,
  },
}));

function EditCourse() {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const id = query.get("id");
  const { data: course } = useGetCourseQuery(id);

  let editCourse;

  if (course) {
    editCourse = <EditCourseForm initialCourse={course} />;
  }
  return editCourse;
}
export default EditCourse;

function EditCourseForm({ initialCourse }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [course, setCourse] = useState({
    name: initialCourse.name,
    slug: initialCourse.slug,
    description: initialCourse.description,
    courseType: initialCourse.courseType,
    duration: initialCourse.duration,
    courseFee: initialCourse.courseFee,
  });

  useEffect(() => {
    if (initialCourse) {
      setCourse({
        name: initialCourse.name,
        slug: initialCourse.slug,
        description: initialCourse.description,
        courseType: initialCourse.courseType,
        duration: initialCourse.duration,
        courseFee: initialCourse.courseFee,
      });
    }
  }, [initialCourse]);

  const [editCourse, { data, isLoading, error: responseError }] =
    useEditCourseMutation();

  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data?.errors);
    }

    if (responseError?.error) {
      setError({ message: "Network Error" });
    }

    if (data) {
      setSuccess(data.message);
    }
  }, [responseError, data, course]);

  const handleChange = (name, value) => {
    setCourse({
      ...course,
      [name]: value,
    });
  };

  const handleChangeName = (value) => {
    setCourse({
      ...course,
      name: value,
      slug: value.split(" ").join("-").toLowerCase(),
    });
  };

  const handleChangeSlug = (value) => {
    setCourse({
      ...course,
      slug: value.split(" ").join("-").toLowerCase(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    editCourse({ id: initialCourse._id, data: course });
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
              value={course.name}
              onChange={(e) => handleChangeName(e.target.value)}
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
              value={course.slug}
              onChange={(e) => handleChangeSlug(e.target.value)}
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
              value={course.description}
              onChange={(e) => handleChange("description", e.target.value)}
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
              value={course.courseType}
              onChange={(e) => handleChange("courseType", e.target.value)}
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
              value={course.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
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
              value={course.courseFee}
              onChange={(e) => handleChange("courseFee", e.target.value)}
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
              Update Course
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

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
