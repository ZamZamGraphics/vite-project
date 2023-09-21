import {
  Box,
  Grid,
  Typography,
  Alert,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  tableCellClasses,
  TablePagination,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import NewCourses from "./NewCourses";
import { useGetCoursesQuery } from "../../../redux/features/courses/coursesApi";
import { useState } from "react";
import CoursesLoader from "./CoursesLoader";
import Action from "./Action";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    padding: ".5rem 1rem",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: theme.palette.action.selected,
  },
}));

function Courses() {
  const [search, setSearch] = useState("");

  // for pagination
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, isError } = useGetCoursesQuery(search);
  const total = data?.total || 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleChangePerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <CoursesLoader rowsNum={10} />;
  } else if (!isLoading && isError) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" colSpan={6}>
          <Alert severity="warning">Internal Server Error</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && data?.users?.length === 0) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" colSpan={6}>
          <Alert severity="warning">Course Not Found</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && data?.courses?.length > 0) {
    const { courses } = data;
    content = (
      perPage > 0
        ? courses.slice(page * perPage, page * perPage + perPage)
        : courses
    ).map((course) => (
      <TableRow key={course._id}>
        <TableCell component="th" scope="row">
          {course.name}
        </TableCell>
        <TableCell>{course.courseType}</TableCell>
        <TableCell>{course.duration}</TableCell>
        <TableCell>{course.courseFee}</TableCell>
        <TableCell width={50}>
          <Action course={course} />
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Courses
          </Typography>
          <NewCourses />
        </Grid>
        <Grid item xs={12} md={8} textAlign="end">
          <FormControl sx={{ mb: 2 }}>
            <InputLabel htmlFor="search" size="small">
              Search
            </InputLabel>
            <OutlinedInput
              size="small"
              id="search"
              sx={{
                backgroundColor: "input.background",
              }}
              type="search"
              label="Search"
              name="search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="courses table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Duration</StyledTableCell>
                  <StyledTableCell>Course Fee</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>{content}</TableBody>
              <TableFooter>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TablePagination
                    rowsPerPageOptions={[
                      10,
                      15,
                      20,
                      { label: "All", value: total },
                    ]}
                    colSpan={5}
                    count={total}
                    rowsPerPage={perPage}
                    page={page}
                    labelRowsPerPage="Show per page"
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    showFirstButton
                    showLastButton
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangePerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Courses;
