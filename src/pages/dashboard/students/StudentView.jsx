import {
  Typography,
  Avatar,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Dialog,
  DialogContent,
} from "@mui/material";
import Status from "../../../component/Status";
import dayjs from "dayjs";

function StudentView({ open, handleClose, student }) {
  const {
    avatar,
    fullName,
    status,
    studentId,
    fathersName,
    mothersName,
    address,
    birthDay,
    gender,
    phone,
    email,
    nid,
    birthCertificate,
    bloodGroup,
    occupation,
    education,
    reference,
    registeredAt,
  } = student;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="body"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth={true}
    >
      <DialogContent>
        <Stack direction="column" alignItems="center" spacing={2} mb={2}>
          <Avatar
            src={`${import.meta.env.VITE_API_URL}/upload/${avatar}`}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h5">{fullName}</Typography>
          <Typography variant="body2" component="span">
            <Status status={status} />
          </Typography>
        </Stack>
        <TableContainer>
          <Table sx={{ width: "100%" }} size="small" aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Student ID</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{studentId}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Father's Name</TableCell>
                <TableCell>{fathersName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mother's Name</TableCell>
                <TableCell>{mothersName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Present Address</TableCell>
                <TableCell>{address.present}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Permanent Address</TableCell>
                <TableCell>{address.permanent}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date of Birth</TableCell>
                <TableCell>{dayjs(birthDay).format("DD MMMM YYYY")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gender</TableCell>
                <TableCell>{gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Student mobile number</TableCell>
                <TableCell>{phone[0]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Guardian mobile number</TableCell>
                <TableCell>{phone[1]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E-mail</TableCell>
                <TableCell>{email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NID Number</TableCell>
                <TableCell>{nid}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Birth Certificate No</TableCell>
                <TableCell>{birthCertificate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Blood Group</TableCell>
                <TableCell>{bloodGroup}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Student's Occupation</TableCell>
                <TableCell>{occupation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Educational Qualification</TableCell>
                <TableCell>{education}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell>{reference}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Student Registered</TableCell>
                <TableCell>
                  {dayjs(registeredAt).format("DD MMMM YYYY h:mm A")}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}

export default StudentView;
