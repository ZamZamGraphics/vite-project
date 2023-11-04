import {
  Box,
  Typography,
  Alert,
  Avatar,
  Stack,
  Skeleton,
  TableFooter,
  TablePagination,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  Chip,
} from "@mui/material";
import dayjs from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Action from "../admission/Action";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useGetAdmissionsQuery } from "../../../redux/features/admission/admissionApi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    padding: ".5rem 1rem",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: theme.palette.action.selected,
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
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
    </TableRow>
  ));
};

function Admission() {
  const [search, setSearch] = useState("");
  // for pagination
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetAdmissionsQuery(
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
        <TableCell component="th" scope="row" colSpan={10}>
          <Alert severity="warning">Internal Server Error</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && data?.admission?.length === 0) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" colSpan={10}>
          <Alert severity="warning">Admission Not Found</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && data?.admission?.length > 0) {
    content = data.admission.map((admission) => (
      <TableRow key={admission._id}>
        <TableCell>
          <Typography variant="h6">{admission.student.studentId}</Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link to={`/dashboard/admission/${admission._id}`}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                alt={admission.student.fullName}
                src={`${import.meta.env.VITE_API_URL}/upload/${
                  admission.student.avatar
                }`}
                sx={{ width: 40, height: 40 }}
              />
              <Typography>{admission.student.fullName}</Typography>
            </Stack>
          </Link>
        </TableCell>
        <TableCell>{admission.course.name}</TableCell>
        <TableCell>{admission.batchNo}</TableCell>
        <TableCell>{admission.payableAmount}</TableCell>
        <TableCell>{admission.payment}</TableCell>
        <TableCell>{admission.due}</TableCell>
        <TableCell>
          {
          admission?.nextPay ? dayjs(admission?.nextPay).format("DD-MM-YYYY") :
          <Chip size="small" label="Full Paid" color="success" />
          }
        </TableCell>
        <TableCell>
          <Chip size="small" label={admission.paymentType} color="info" />
        </TableCell>
        <TableCell width={50}>
          <Action admission={admission} />
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        All Admission
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
        <Table sx={{ minWidth: 650 }} size="small" aria-label="admission table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Student ID</StyledTableCell>
              <StyledTableCell>Student Name</StyledTableCell>
              <StyledTableCell>Course Name</StyledTableCell>
              <StyledTableCell>Batch No</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Payment</StyledTableCell>
              <StyledTableCell>Due</StyledTableCell>
              <StyledTableCell>Next Pay Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
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
                  { label: "All", value: total },
                ]}
                colSpan={10}
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

export default Admission;
