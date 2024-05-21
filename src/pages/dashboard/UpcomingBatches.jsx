import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    tableCellClasses
} from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { useGetBatchesQuery } from "../../redux/features/batches/batchesApi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      padding: ".5rem 1rem",
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: theme.palette.action.selected,
    },
  }));

function UpcomingBatches() {

    const { data, isLoading, isError } = useGetBatchesQuery( `?limit=999999&from=${dayjs(new Date()).format("YYYY-MM-DD")}&to=2024-08-11` );

     // decide what to render
  let content = null;
  if (isLoading) {
    content = "Loading...";
  } else if (!isLoading && !isError && data?.length === 0) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" colSpan={6}>
            Upcoming Batch Not Found
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && data?.length > 0) {
    content = data.map((batch) => (
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
            <strong>Status</strong>
          </Typography>
          {batch.classTime}
        </TableCell>
        <TableCell>
          {dayjs(batch.startDate).format("DD-MM-YYYY")} <br />
          {dayjs(batch.endDate).format("DD-MM-YYYY")}
        </TableCell>
        <TableCell>{batch.classDays}</TableCell>
        <TableCell>{batch.student.length}</TableCell>
      </TableRow>
    ));
  }

  return (
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
            </TableRow>
            </TableHead>
            <TableBody>{content}</TableBody>
        </Table>
    </TableContainer>
  )
}

export default UpcomingBatches;