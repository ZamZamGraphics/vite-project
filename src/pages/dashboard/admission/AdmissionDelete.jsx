import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteAdmissionMutation } from "../../../redux/features/admission/admissionApi";
import { useState, useEffect } from "react";

function AdmissionDelete({ open, handleClose, id }) {
  const [error, setError] = useState("");
  const [deleteAdmission, { data, isLoading, error: responseError }] =
    useDeleteAdmissionMutation();

  useEffect(() => {
    if (responseError?.data?.errors) {
      setError(responseError.data?.errors);
    }

    if (responseError?.error) {
      setError({ message: "Network Error" });
    }
    if (data?.message) {
      handleClose();
    }
  }, [data, handleClose, responseError]);

  const handleDelete = () => {
    deleteAdmission(id);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-title"
      aria-describedby="delete-description"
    >
      <DialogTitle id="delete-title" color="error">
        {error?.message
          ? error.message
          : "Are you sure want to delete this admission?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-description">
          will be automatically deleted from the included batch If you are a new
          student!
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          disableElevation
          startIcon={<DeleteIcon />}
          color="error"
          disabled={isLoading}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AdmissionDelete;
