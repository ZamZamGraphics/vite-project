import PrintIcon from "@mui/icons-material/Print";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { grey, lightGreen } from "@mui/material/colors";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import logo from "../../../assets/images/logo-dark.svg";
import Status from "../../../component/Status";
import { useGetAdmissionQuery } from "../../../redux/features/admission/admissionApi";

function Invoice() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetAdmissionQuery(id);

  const handlePrint = () => {
    window.print();
  };

  let admission;

  if (isLoading) {
    admission = <CircularProgress />;
  } else if (!isLoading && isError) {
    admission = <Alert severity="error">Internal Server Error</Alert>;
  } else if (!isLoading && !isError && data) {
    let courseFee;
    if (data.paymentType === "New") {
      courseFee = (
        <>
          <TableCell>
            <strong>Course Fee</strong>
          </TableCell>
          <TableCell>{data.course.courseFee}</TableCell>
        </>
      );
    } else {
      courseFee = (
        <>
          <TableCell>
            <strong>Preveus Due</strong>
          </TableCell>
          <TableCell>{data.payableAmount + data.discount}</TableCell>
        </>
      );
    }

    admission = (
      <Grid container alignItems="center" direction="column">
        <Grid item xs={9} sx={{
              width: "980px",
              color: "#000",
              backgroundColor: "#fff",
            }}>
          <Box sx={{ textAlign: "right" }} displayPrint="none">
            <IconButton
              onClick={handlePrint}
              aria-label="delete"
              size="large"
            >
              <PrintIcon />
            </IconButton>
          </Box>
          <div className="h-2 bg-lime-600 mb-10"></div>
          <Box sx={{padding: 5}} >
            <Grid container spacing={6}>
              <Grid
                item
                xs={7}
                container
                direction="row"
                alignItems="center"
              >
                <Link to={`/dashboard/admission`}>
                  <img src={logo} alt="AL MADINA IT" width={250} />
                </Link>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body1" mb={2}>
                  #Fakhre Bangal Road, Kandipara, <br />
                  Brahmanbaria-3400 <br />
                  Phone : 01736722622 <br />
                  Email : almadinait@gmail.com <br />
                  Web : www.almadinait.com
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TableContainer>
                  <Table 
                    sx={{
                      "& .MuiTableCell-sizeMedium": {
                        padding: "10px 16px",
                      },
                    }} 
                    aria-label="invoice table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            color: "#fff",
                            bgcolor: lightGreen["700"],
                          }}
                          colSpan={2}
                        >
                          <Typography variant="h6">
                          {data.paymentType}
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
                            sx={{ textAlign: "center", color: lightGreen["900"], bgcolor: lightGreen["200"] }}
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
              <Grid item xs={6} sx={{ textAlign: "center", marginBottom: 5 }}>
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
              </Grid>
              <Grid item xs={7}>
                <TableContainer>
                  <Table
                    sx={{ width: "100%" }}
                    size="small"
                    aria-label="invoice table"
                  >
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h5">
                            Student ID
                          </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="h5">
                          {data.student.studentId}
                        </Typography>
                        </TableCell>
                      </TableRow>
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
              <Grid item xs={5} sx={{ marginTop: 5, marginBottom: 10 }}>
                <TableContainer>
                  <Table
                    sx={{
                      "& .MuiTableCell-sizeMedium": {
                        padding: "10px 16px",
                      },
                    }}
                  >
                    <TableBody>
                      <TableRow sx={{ bgcolor: grey["100"] }}>
                        {courseFee}
                      </TableRow>
                      <TableRow sx={{ bgcolor: grey["100"] }}>
                        <TableCell>
                          <strong>Discount</strong>
                        </TableCell>
                        <TableCell>{data?.discount || 0}</TableCell>
                      </TableRow>
                      <TableRow sx={{ bgcolor: grey["100"] }}>
                        <TableCell>
                          <strong>Total</strong>
                        </TableCell>
                        <TableCell>{data.payableAmount}</TableCell>
                      </TableRow>
                      <TableRow sx={{ bgcolor: grey["300"] }}>
                        <TableCell>
                          <strong>Payment</strong>
                        </TableCell>
                        <TableCell>{data.payment}</TableCell>
                      </TableRow>
                      <TableRow sx={{ bgcolor: grey["100"] }}>
                        <TableCell>
                          <strong>Due</strong>
                        </TableCell>
                        <TableCell>{data.due}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={7}>
                <Box
                  sx={{
                    width:200,
                    paddingY:10
                  }}
                >
                  <Divider  />
                  <Typography sx={{ paddingY: 3 }}>
                    Authorized Signatory
                  </Typography>
                </Box>
                <ul className="text-black">
                  <li>This invoice must be produced when demanded.</li>
                  <li>Fees once paid are not refundable.</li>
                  <li>
                    Subject to terms and conditions printed overleaf the
                    invoice.
                  </li>
                </ul>
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
