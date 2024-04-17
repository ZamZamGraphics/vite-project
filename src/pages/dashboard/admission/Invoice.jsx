import {
  Alert,
  Avatar,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { grey, lightGreen } from "@mui/material/colors";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import logo from "../../../assets/images/logo-dark.svg";
import Status from "../../../component/Status";
import { useGetAdmissionQuery } from "../../../redux/features/admission/admissionApi";

function Invoice() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetAdmissionQuery(id);

  let admission;

  if (isLoading) {
    admission = "Loading...";
  } else if (!isLoading && isError) {
    admission = <Alert severity="error">Internal Server Error</Alert>;
  } else if (!isLoading && !isError && data) {
    console.log(data);
    admission = (
      <Grid container alignItems="center" direction="column">
        <Grid item xs={9}>
          <Box
            sx={{
              padding: 5,
              maxWidth: "990px",
              backgroundColor: "background.paper",
              borderRadius: "6px",
              boxShadow: 1,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={7}>
                <Link to={`/dashboard/admission`}>
                  <img src={logo} alt="AL MADINA IT" width={250} />
                </Link>
                <Typography variant="body2" mb={2}>
                  #Fakhre Bangal Road, Kandipara, <br />
                  Brahmanbaria-3400 <br />
                  Email: almadinait@gmail.com <br />
                  Phone : 01736722622
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <TableContainer>
                  <Table
                    sx={{ width: "100%" }}
                    size="small"
                    aria-label="invoice table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ color: "white", bgcolor: grey["500"] }}
                          colSpan={2}
                        >
                          <Typography variant="body1">
                            Invoice ID : {data._id}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ bgcolor: grey["100"] }}>
                      <TableRow>
                        <TableCell>
                          <strong>Invoice Date</strong>
                        </TableCell>
                        <TableCell>
                          {dayjs(data.admitedAt).format("DD-MM-YYYY")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        {data?.nextPay ? (
                          <>
                            <TableCell>
                              <strong>Due Date</strong>
                            </TableCell>
                            <TableCell>
                              {dayjs(data.nextPay).format("DD-MM-YYYY")}
                            </TableCell>
                          </>
                        ) : (
                          <TableCell
                            sx={{ bgcolor: lightGreen["100"] }}
                            colSpan={2}
                          >
                            <strong>Payment Completed</strong>
                          </TableCell>
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={6}>
                <Avatar
                  src={`${import.meta.env.VITE_API_URL}/upload/${
                    data.student?.avatar
                  }`}
                  sx={{
                    width: 130,
                    height: 150,
                  }}
                  className="mx-auto mb-5 p-1 ring-2 ring-gray-200"
                  variant="rounded"
                />
                <TableContainer>
                  <Table
                    sx={{ width: "100%" }}
                    size="small"
                    aria-label="invoice table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ color: "white", bgcolor: lightGreen["500"] }}
                          colSpan={2}
                        >
                          <Typography variant="h5">
                            Student ID {data.student.studentId}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <strong>Student Name</strong>
                        </TableCell>
                        <TableCell>{data.student.fullName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Address</strong>
                        </TableCell>
                        <TableCell>{data.student.address.present}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Mobile</strong>
                        </TableCell>
                        <TableCell>{data.student.phone[0]}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Status</strong>
                        </TableCell>
                        <TableCell>
                          <Status status={data.student.status} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Course Name</strong>
                        </TableCell>
                        <TableCell>{data.course.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Batch No</strong>
                        </TableCell>
                        <TableCell>{data.batchNo}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }
  return admission;
}

export default Invoice;
