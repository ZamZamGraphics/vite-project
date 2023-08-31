import { Alert } from "@mui/material";
import { useGetUserQuery } from "../../../redux/features/users/usersApi";
import EditForm from "./EditForm";
import { useParams } from "react-router-dom";

function EditUser() {
  const { userId } = useParams();
  const { data: user, isLoading, isError, error } = useGetUserQuery(userId);

  let editUser;

  if (isLoading) {
    // loading
  } else if (!isLoading && isError) {
    editUser = (
      <Alert variant="filled" severity="error">
        {error?.data?.message}
      </Alert>
    );
  } else if (!isLoading && !isError && user) {
    editUser = <EditForm title="Edit User" id={user?._id} userEdit={user} />;
  }
  return editUser;
}

export default EditUser;
