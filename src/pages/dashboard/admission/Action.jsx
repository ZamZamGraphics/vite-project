import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PrintIcon from "@mui/icons-material/Print";
import {
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Popover,
} from "@mui/material";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdmissionDelete from "./AdmissionDelete";
import InvoicePDF from "./InvoicePDF";

function Action({ admission }) {
  const auth = useSelector((state) => state.auth);
  const { role } = auth.user;

  const [open, setOpen] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
    handleCloseMenu();
  };

  const handleDownload = () => {
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
          to={`/dashboard/admission/invoice/${admission._id}`}
          onClick={handlePrint}
        >
          <ListItemIcon>
            <PrintIcon />
          </ListItemIcon>
          Print
        </MenuItem>
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
          <PDFDownloadLink document={<InvoicePDF data={admission} />} fileName={`${admission._id}.pdf`}>
            {({ loading }) =>
              loading ? 'Loading...' : 'Download'
            }
          </PDFDownloadLink>
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
      {role === "Admin" ? (
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
