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
import { Link } from "react-router-dom";
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

  const { data, isLoading, isError } = useGetBatchesQuery( `?limit=8&from=${dayjs(new Date()).format("YYYY-MM-DD")}` );

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
    content = <BatchesTable batches={data} />;
  }

  return content;
}

export default UpcomingBatches;

function BatchesTable({batches}) {
  return (
    <TableContainer component={Paper}>
        <Table size="small">
            <TableHead>
              <TableRow>
                  <StyledTableCell>Batch No</StyledTableCell>
                  <StyledTableCell>Course Name</StyledTableCell>
                  <StyledTableCell>Start & End</StyledTableCell>
                  <StyledTableCell>Days</StyledTableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {batches.map((batch) => (
              <TableRow key={batch._id}>
                <TableCell>
                  <Link to="/dashboard/admission/batches">
                    <Typography variant="h6">{batch.batchNo}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography>
                    <strong>{batch.course?.name}</strong>
                  </Typography>
                  {batch.course?.courseType}
                </TableCell>
                <TableCell>
                  {dayjs(batch.startDate).format("DD-MM-YYYY")} <br />
                  {dayjs(batch.endDate).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>{batch.classDays}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </TableContainer>
  )
}