import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Avatar,
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Skeleton,
  Stack,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Status from "../../../component/Status";
import { useGetStudentsQuery } from "../../../redux/features/students/studentsApi";
import Action from "./Action";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    padding: ".5rem 1rem",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: theme.palette.action.selected,
  },
  [`&.${tableCellClasses.body}`]: {
    padding: "0.125rem 1rem",
    fontSize: "1rem"
  },
}));

const TableRowsLoader = ({ rowsNum }) => {
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow
      key={index}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell component="th" scope="row">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
          <Skeleton animation="wave" variant="text" width="100%" />
        </Stack>
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
    </TableRow>
  ));
};

function Students() {
  const [search, setSearch] = useState("");
  // for pagination
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetStudentsQuery(
    location.search || `?limit=${perPage}`
  );
  const total = data?.total || 0;

  const queryString = (pageNo, limit, search = null) => {
    let query = "?";
    query += pageNo > 0 ? `page=${pageNo}` : `page=0`;
    query += limit ? `&limit=${limit}` : `&limit=${perPage}`;
    query += search ? `&search=${search}` : "";
    return query;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    navigate(location.pathname + queryString(newPage, perPage, search));
  };

  const handleSearch = (value) => {
    setSearch(value);
    navigate(location.pathname + queryString(page, perPage, value));
  };

  const handleChangePerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
    navigate(location.pathname + queryString(page, event.target.value, search));
  };

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <TableRowsLoader rowsNum={20} />;
  } else if (!isLoading && isError) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" colSpan={8}>
          <Alert severity="warning">Internal Server Error</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && data?.students?.length === 0) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" colSpan={8}>
          <Alert severity="warning">Student Not Found</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && data?.students?.length > 0) {
    content = data.students.map((student) => (
      <TableRow key={student._id}>
        <StyledTableCell>
          <Typography variant="h6">{student.studentId}</Typography>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <Link to={`/dashboard/students/${student._id}`}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                alt={student.fullName}
                src={`${import.meta.env.VITE_API_URL}/upload/${student.avatar}`}
                sx={{ width: 40, height: 40 }}
              />
              <Typography>{student.fullName}</Typography>
            </Stack>
          </Link>
        </StyledTableCell>
        <StyledTableCell>{student.phone[0]}</StyledTableCell>
        <StyledTableCell>
          {student.admissionDetails.map((admission) => {
            return (
              <Typography key={admission._id}>
                {admission?.course?.name}
              </Typography>
            );
          })}
        </StyledTableCell>
        <StyledTableCell>
          {student.admissionDetails.map((admission) => {
            return (
              <Typography key={admission._id}>{admission?.batchNo}</Typography>
            );
          })}
        </StyledTableCell>
        <StyledTableCell>
          <Status status={student.status} />
        </StyledTableCell>
        <StyledTableCell>{student.totalDues}</StyledTableCell>
        <StyledTableCell width={50}>
          <Action student={student} />
        </StyledTableCell>
      </TableRow>
    ));
  }
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        All Students
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="search" size="small">
              Search
            </InputLabel>
            <OutlinedInput
              size="small"
              id="search"
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
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="students table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Student ID</StyledTableCell>
              <StyledTableCell>Student Name</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell>Course Name</StyledTableCell>
              <StyledTableCell>Batch No</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Due</StyledTableCell>
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
                  20,
                  25,
                  30,
                  40,
                  100,
                ]}
                colSpan={8}
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
    </Box>
  );
}

export default Students;
