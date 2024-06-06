import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  useGetCourseQuery,
  useGetCoursesQuery,
} from "../../../redux/features/courses/coursesApi";
import Action from "./Action";
import CoursesLoader from "./CoursesLoader";
import EditCourse from "./EditCourse";
import NewCourse from "./NewCourse";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    padding: ".5rem 1rem",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: theme.palette.action.selected,
  },
}));

function Courses() {
  const [request, setRequest] = useState(false);
  const [search, setSearch] = useState("");

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const id = query.get("id");
  const { data: course } = useGetCourseQuery(id, { skip: !request });

  useEffect(() => {
    if (id) {
      setRequest(true);
    }
  }, [id]);

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
        <TableCell component="th" scope="row" colSpan={5}>
          <Alert severity="warning">Internal Server Error</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && data?.courses?.length === 0) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" colSpan={5}>
          <Alert severity="warning">Course Not Found</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && data?.courses?.length > 0) {
    content = (
      perPage > 0 ? data.courses.slice(page * perPage, page * perPage + perPage) : data
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

  let editCourse = null;
  if (course) {
    editCourse = <EditCourse />;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Typography variant="h5">Courses</Typography>
            {id && (
              <div className="px-3 border border-gray-600 rounded-full">
                <Link to="/dashboard/admission/courses">Add New</Link>
              </div>
            )}
          </Stack>
          {id ? editCourse : <NewCourse />}
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
                      50,
                      100,
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
