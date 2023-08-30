import {
  Box,
  Typography,
  Snackbar,
  Alert,
  Avatar,
  Stack,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppBadIcon from "@mui/icons-material/GppBad";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useGetUsersQuery } from "../../../redux/features/users/usersApi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    padding: ".5rem 1rem",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: theme.palette.action.selected,
  },
}));

function Users() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openIcon = Boolean(anchorEl);
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery({ page: 1, limit: 5 });

  const userStatus = (status) => {
    let icon, color;
    if (status === "Verified") {
      icon = <VerifiedUserIcon />;
      color = "success";
    } else {
      icon = <GppBadIcon />;
      color = "warning";
    }
    return <Chip size="small" label={status} icon={icon} color={color} />;
  };

  const ITEM_HEIGHT = 48;

  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row">
          Loading ...
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && isError) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" colSpan={6}>
          <Alert severity="warning">{error?.error}</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && users?.length === 0) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" colSpan={6}>
          <Alert severity="warning">User Not Found</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && users?.length > 0) {
    content = users.map((user) => (
      <TableRow
        key={user._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={user.fullname}
              src={`${import.meta.env.VITE_API_URL}/upload/${user.avatar}`}
              sx={{ width: 40, height: 40 }}
            />
            <Typography>{user.fullname}</Typography>
          </Stack>
        </TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{userStatus(user.status)}</TableCell>
        <TableCell>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={openIcon ? "long-menu" : undefined}
            aria-expanded={openIcon ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          {user._id}
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={openIcon}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "100ch",
              },
            }}
          >
            <MenuItem
              component={Link}
              to={`/dashboard/users/${user._id}`}
              onClick={handleClose}
            >
              View
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    ));
  }
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        All Users
      </Typography>

      {location.state && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={5000}
        >
          <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
            {location.state}
          </Alert>
        </Snackbar>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Fullname</StyledTableCell>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{content}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Users;
