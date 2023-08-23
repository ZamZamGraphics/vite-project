import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const userList = [
  {
    id: 1,
    username: "ZamZam",
    password: "123",
    email: "admin@gmail.com",
    role: "admin",
  },
  {
    id: 2,
    username: "sultan",
    password: "123",
    email: "admin@gmail.com",
    role: "admin",
  },
  {
    id: 3,
    username: "Editor",
    password: "123",
    email: "admin@gmail.com",
    role: "editor",
  },
  {
    id: 4,
    username: "Admin",
    password: "123",
    email: "admin@gmail.com",
    role: "admin",
  },
  {
    id: 5,
    username: "Author",
    password: "123",
    email: "admin@gmail.com",
    role: "author",
  },
];
function Users() {
  return (
    <Box>
      <Typography variant="h5">All Users</Typography>
      {userList.map((user) => {
        return (
          <li key={user.id}>
            <Link to={`${user.id}`}>{user.username}</Link>
          </li>
        );
      })}
    </Box>
  );
}

export default Users;
