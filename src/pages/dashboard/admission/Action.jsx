import {
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Popover,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../../redux/features/users/usersApi";
import { useSelector } from "react-redux";
import AdmissionDelete from "./AdmissionDelete";

function Action({ admission }) {
  const auth = useSelector((state) => state.auth);
  const { userid } = auth.user;

  const [open, setOpen] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data: loggedUser } = useGetUserQuery(userid);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handlePrint = () => {
    console.log("handle print ....");
    handleCloseMenu();
  };

  const handleDownload = () => {
    console.log("handle download ....");
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
          to={`/dashboard/admission/${admission._id}`}
          onClick={handlePrint}
        >
          <ListItemIcon>
            <PrintIcon />
          </ListItemIcon>
          Print
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/dashboard/admission/${admission._id}`}
          onClick={handleDownload}
        >
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
          Download
        </MenuItem>
        {loggedUser.role === "Admin" ? (
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
      {loggedUser.role === "Admin" ? (
        <AdmissionDelete
          open={openDeleteModal}
          handleClose={handleCloseDeleteModal}
          id={admission._id}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Action;
