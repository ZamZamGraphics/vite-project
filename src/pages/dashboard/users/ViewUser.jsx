import {
  Modal,
  Box,
  Typography,
  Avatar,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import Status from "../../../component/Status";

const style = {
  position: "absolute",
  transform: "translate(-50%, -20%)",
  bgcolor: "background.default",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  width: "100%",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ViewUser({ open, handleClose, user }) {
  const { fullname, avatar, email, username, status, role, createdAt } = user;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
    >
      <Box
        sx={{
          maxWidth: 650,
          position: "relative",
          top: "20%",
          left: "50%",
        }}
      >
        <Box sx={style}>
          <Stack direction="column" alignItems="center" spacing={2} mb={2}>
            <Avatar
              src={`${import.meta.env.VITE_API_URL}/upload/${avatar}`}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h4" component="h4">
              {fullname}
            </Typography>
            <Typography variant="body2" component="span">
              <Status status={status} />
            </Typography>
          </Stack>
          <TableContainer>
            <Table sx={{ width: "100%" }} size="small" aria-label="user table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>{username}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>{email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Role</TableCell>
                  <TableCell>{role}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Registered</TableCell>
                  <TableCell>{createdAt}</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Modal>
  );
}
