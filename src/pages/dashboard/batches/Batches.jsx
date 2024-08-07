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
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  useGetBatchQuery,
  useGetBatchesQuery,
} from "../../../redux/features/batches/batchesApi";
import Action from "./Action";
import BatchEdit from "./BatchEdit";
import Loading from "./Loading";
import NewBatch from "./NewBatch";
dayjs.extend(isBetween);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    padding: ".5rem 1rem",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: theme.palette.action.selected,
  },
}));

function Batches() {
  const [request, setRequest] = useState(false);
  const [search, setSearch] = useState("");

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const id = query.get("id");
  const { data: batch } = useGetBatchQuery(id, { skip: !request });

  useEffect(() => {
    if (id) {
      setRequest(true);
    }
  }, [id]);

  // for pagination
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, isError } = useGetBatchesQuery(`?search=${search}`);
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
    content = <Loading rowsNum={10} />;
  } else if (!isLoading && isError) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" colSpan={7}>
          <Alert severity="warning">Internal Server Error</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && data?.batches?.length === 0) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" colSpan={7}>
          <Alert severity="warning">Batch Not Found</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && data?.batches?.length > 0) {
    content = (
      perPage > 0 ? data.batches.slice(page * perPage, page * perPage + perPage) : data
    ).map((batch) => (
      <TableRow key={batch._id}>
        <TableCell component="th" scope="row">
          <Typography variant="h6">{batch.batchNo}</Typography>
        </TableCell>
        <TableCell>
          <Typography>
            <strong>{batch.course?.name}</strong>
          </Typography>
          {batch.course?.courseType}
        </TableCell>
        <TableCell>
          <Typography>
            <strong>
            { 
              dayjs().isBetween(dayjs(batch.startDate), dayjs(dayjs(batch.endDate))) ? "Running" :
              dayjs().isBefore(dayjs(batch.startDate)) ? "Upcoming" : "Completed"
            }
            </strong>
          </Typography>
          {batch.classTime}
        </TableCell>
        <TableCell>
          {dayjs(batch.startDate).format("DD-MM-YYYY")} <br />
          {dayjs(batch.endDate).format("DD-MM-YYYY")}
        </TableCell>
        <TableCell>{batch.classDays}</TableCell>
        <TableCell>{batch.student.length}</TableCell>
        <TableCell width={50}>
          <Action batch={batch} />
        </TableCell>
      </TableRow>
    ));
  }

  let editBatch = null;
  if (batch) {
    editBatch = <BatchEdit />;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Typography variant="h5">Batches</Typography>
            {id && (
              <div className="px-3 border border-gray-600 rounded-full">
                <Link to="/dashboard/admission/batches">Add New</Link>
              </div>
            )}
          </Stack>
          {id ? editBatch : <NewBatch />}
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
                  <StyledTableCell>Batch No</StyledTableCell>
                  <StyledTableCell>Course Name</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Start & End</StyledTableCell>
                  <StyledTableCell>Days</StyledTableCell>
                  <StyledTableCell>Count</StyledTableCell>
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
                    colSpan={7}
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

export default Batches;
