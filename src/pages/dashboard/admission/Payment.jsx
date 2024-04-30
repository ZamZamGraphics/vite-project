import {
  Alert,
  Avatar,
  Box,
  Button,
  FormHelperText,
  Grid,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Status from "../../../component/Status";
import {
  useAddPaymentMutation,
  useGetStdAdmissionQuery,
} from "../../../redux/features/admission/admissionApi";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    background: `${theme.palette.mode === "dark" ? grey[900] : "#fff"}`,
  },
}));

function Payment() {
  const [request, setRequest] = useState(false);
  const [error, setError] = useState("");

  const [batchNo, setBatchNo] = useState("");
  const [studentId, setStudentId] = useState("");
  const [discount, setDiscount] = useState("");
  const [payment, setPayment] = useState("");
  const [nextPay, setNextPay] = useState("");

  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [total, setTotal] = useState("");
  const [previousDue, setPreviousDue] = useState("");
  const [due, setDue] = useState("");

  const { data: std } = useGetStdAdmissionQuery(`${batchNo}/${studentId}`, {
    skip: !request,
  });

  useEffect(() => {
    if (std?.admission) {
      const { admission } = std;
      setStudent(admission.student);
      setCourse(admission.course);
      setPreviousDue(admission.due);
      const total = admission.due - discount;
      setTotal(total);
      setDue(total - payment);
    } else {
      setStudent("");
      setCourse("");
      setPreviousDue("");
      setTotal("");
      setDue("");
    }
  }, [std, discount, payment]);

  const [addPayment, { data: admission, isLoading, error: responseError }] =
    useAddPaymentMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data?.errors);
    }

    if (responseError?.data?.errors?.course) {
      setError({ message: "Student ID & Batch No did not matched!" });
    }

    if (responseError?.error) {
      setError({ message: "Network Error" });
    }

    if (admission) {
      reset();
      // success redirect to print page
      navigate(`/dashboard/admission/invoice/${admission.admission._id}`);
    }
  }, [responseError, admission, navigate]);

  const reset = () => {
    setStudentId("");
    setDiscount("");
    setPayment("");
    setNextPay("");
    setBatchNo("");
    setStudent("");
    setCourse("");
    setPreviousDue("");
  };

  const handleStudent = (stdId) => {
    setStudentId(stdId);
    setError("");
    setRequest(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (discount > previousDue) {
      setError({
        discount: {
          msg: "The discount cannot exceed the previous due.",
        },
      });
    } else if (payment > total) {
      setError({
        payment: {
          msg: "Payment cannot exceed the total.",
        },
      });
    } else {
      const data = {
        batch: batchNo,
        student: studentId,
        course: course.id,
        discount,
        payment,
        paymentType: "Payment",
        nextPay:dayjs(nextPay).format(),
      };
      addPayment(data);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "background.paper",
        borderRadius: "10px",
        boxShadow: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Payment
          </Typography>
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
                  label="Batch No"
                  name="batchNo"
                  value={batchNo}
                  onChange={(e) => setBatchNo(e.target.value)}
                  error={error.batch && true}
                  helperText={error.batch && error.batch.msg}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  size="small"
                  fullWidth
                  label="Student ID"
                  name="studentId"
                  value={studentId}
                  onChange={(e) => handleStudent(e.target.value)}
                  error={error.student && true}
                  helperText={error.student && error.student.msg}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  size="small"
                  fullWidth
                  label="Discount"
                  name="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  error={error.discount && true}
                  helperText={error.discount && error.discount.msg}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  size="small"
                  fullWidth
                  label="Payment"
                  name="payment"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  error={error.payment && true}
                  helperText={error.payment && error.payment.msg}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Next Payment Date"
                    // views={["day", "month", "year"]}
                    format="DD-MM-YYYY"
                    name="nextPay"
                    value={nextPay}
                    onChange={(value) => setNextPay(value)}
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        error: error.nextPay ? true : false,
                      },
                    }}
                    sx={{ mt: 1, backgroundColor: "input.background" }}
                  />
                </LocalizationProvider>
                {error.nextPay && (
                  <FormHelperText error>{error.nextPay.msg}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                  type="submit"
                  sx={{ borderRadius: "9999px", mt: 2, mb: 2 }}
                  disableElevation
                  variant="contained"
                  disabled={isLoading}
                >
                  Add New Payment
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <TableContainer align="center">
            <Table size="small" sx={{ maxWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Stack
                      direction="column"
                      alignItems="center"
                      spacing={2}
                      mb={2}
                    >
                      <Avatar
                        src={`${import.meta.env.VITE_API_URL}/upload/${
                          student?.avatar
                        }`}
                        sx={{ width: 60, height: 60 }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="40%" align="right">
                    <Typography variant="h6">Student ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{student?.studentId}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Student Status</TableCell>
                  <TableCell>
                    {student?.status && <Status status={student?.status} />}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Student Name</TableCell>
                  <TableCell>{student?.fullName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Student Mobile</TableCell>
                  <TableCell>{student?.phone?.[0]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Batch No</TableCell>
                  <TableCell>{batchNo}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Course Name</TableCell>
                  <TableCell>{course?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Previous Due</TableCell>
                  <TableCell>{previousDue}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell>{discount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Total</TableCell>
                  <TableCell>{total}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Payment</TableCell>
                  <TableCell>{payment}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Due</TableCell>
                  <TableCell>{due}</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Payment;
