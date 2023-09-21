import {
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Popover,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteCourseMutation } from "../../../redux/features/courses/coursesApi";

function Action({ course }) {
  const [open, setOpen] = useState(null);

  const [deleteCourse] = useDeleteCourseMutation();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
  };

  const handleDelete = () => {
    handleCloseMenu();
    deleteCourse(course._id);
  };

  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        sx={{ opacity: 0.48 }}
        onClick={handleOpenMenu}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            boxShadow: 2,
            width: 150,
            "& .MuiMenuItem-root": {
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          component={Link}
          to={`/dashboard/admission/courses?id=${course._id}`}
          onClick={handleEdit}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <ListItemIcon sx={{ color: "error.main" }}>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

export default Action;
