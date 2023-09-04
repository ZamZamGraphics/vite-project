import {
  Box,
  Typography,
  Snackbar,
  Alert,
  Avatar,
  Stack,
  Skeleton,
  TableFooter,
  TablePagination,
} from "@mui/material";
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
import UserAction from "./UserAction";
import Status from "../../../component/Status";

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
    </TableRow>
  ));
};

function Users() {
  const [open, setOpen] = useState(true);

  // for pagination
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const location = useLocation();

  const { data, isLoading, isError } = useGetUsersQuery({
    page: page,
    limit: perPage,
  });

  const total = data?.total || 0;

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <TableRowsLoader rowsNum={10} />;
  } else if (!isLoading && isError) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" colSpan={6}>
          <Alert severity="warning">Internal Server Error</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && data?.users?.length === 0) {
    content = (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" colSpan={6}>
          <Alert severity="warning">User Not Found</Alert>
        </TableCell>
      </TableRow>
    );
  } else if (!isLoading && !isError && data?.users?.length > 0) {
    content = data.users.map((user) => (
      <TableRow key={user._id}>
        <TableCell component="th" scope="row">
          <Link to={`/dashboard/users/${user._id}`}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                alt={user.fullname}
                src={`${import.meta.env.VITE_API_URL}/upload/${user.avatar}`}
                sx={{ width: 40, height: 40 }}
              />
              <Typography>{user.fullname}</Typography>
            </Stack>
          </Link>
        </TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>
          <Status status={user.status} />
        </TableCell>
        <TableCell width={50}>
          <UserAction user={user} />
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
        <Table sx={{ minWidth: 650 }} size="small" aria-label="users table">
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
          <TableFooter>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TablePagination
                rowsPerPageOptions={[
                  10,
                  20,
                  30,
                  { label: "All", value: total },
                ]}
                colSpan={6}
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

export default Users;
