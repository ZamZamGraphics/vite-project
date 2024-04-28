import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Popover,
} from "@mui/material";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StudentDelete from "./StudentDelete";
import StudentView from "./StudentView";

function Action({ student }) {
  const auth = useSelector((state) => state.auth);
  const { role } = auth.user;

  const [open, setOpen] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleView = () => {
    handleCloseMenu();
    setOpenModal(true);
  };

  const handleEdit = () => {
    handleCloseMenu();
  };

  const handleDelete = () => {
    handleCloseMenu();
    setOpenDeleteModal(true);
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
          to={`/dashboard/students/${student._id}`}
          onClick={handleEdit}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleView}>
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          View
        </MenuItem>
        {role === "Admin" ? (
          <>
            <Divider />
            <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
              <ListItemIcon sx={{ color: "error.main" }}>
                <DeleteIcon />
              </ListItemIcon>
              Delete
            </MenuItem>
          </>
        ) : (
          ""
        )}
      </Popover>
      <StudentView
        open={openModal}
        handleClose={handleCloseModal}
        student={student}
      />
      {role === "Admin" ? (
        <StudentDelete
          open={openDeleteModal}
          handleClose={handleCloseDeleteModal}
          studentId={student._id}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Action;
