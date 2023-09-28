import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteStudentMutation } from "../../../redux/features/students/studentsApi";
import { useEffect } from "react";

export default function StudentDelete({ open, handleClose, studentId }) {
  const [deleteStudent, { data, isLoading }] = useDeleteStudentMutation();

  useEffect(() => {
    if (data?.message) {
      handleClose();
    }
  }, [data, handleClose]);

  const handleDelete = () => {
    deleteStudent(studentId);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-title"
      aria-describedby="delete-description"
    >
      <DialogTitle id="delete-title" color="error">
        Are you sure want to delete this student?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-description">
          All admission data will also be deleted! There is no undo!
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
