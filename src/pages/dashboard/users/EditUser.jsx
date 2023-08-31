import { Alert } from "@mui/material";
import { useGetUserQuery } from "../../../redux/features/users/usersApi";
import EditForm from "./EditForm";
import { useParams } from "react-router-dom";
import LoadingForm from "./LoadingForm";

function EditUser() {
  const { userId } = useParams();
  const { data: user, isLoading, isError } = useGetUserQuery(userId);

  let editUser;

  if (isLoading) {
    editUser = <LoadingForm />;
  } else if (!isLoading && isError) {
    editUser = <Alert severity="error">Internal Server Error</Alert>;
  } else if (!isLoading && !isError && user) {
    editUser = <EditForm title="Edit User" id={user?._id} userEdit={user} />;
  }
  return editUser;
}

export default EditUser;
