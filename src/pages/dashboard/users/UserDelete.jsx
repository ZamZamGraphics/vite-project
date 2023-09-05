import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteUserMutation } from "../../../redux/features/users/usersApi";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";

export default function UserDelete({ open, handleClose, userId }) {
  const [error, setError] = useState("");

  const [deleteUser, { data, isLoading, error: responseError }] =
    useDeleteUserMutation(userId);

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
  }, [responseError, data, handleClose]);

  const handleDelete = () => {
    deleteUser(userId);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-title"
      aria-describedby="delete-description"
    >
      <DialogTitle id="delete-title" color="error">
        Are you sure want to delete this user?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-description">
          All associated data will also be deleted! There is no undo!
        </DialogContentText>
        {error?.message && (
          <Alert mb={3} variant="filled" severity="error">
            {error?.message && error?.message}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={handleClose} color="primary">
          Calcel
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
