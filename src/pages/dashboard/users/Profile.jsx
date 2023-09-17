import { Alert } from "@mui/material";
import { useGetUserQuery } from "../../../redux/features/users/usersApi";
import EditForm from "./EditForm";
import LoadingForm from "./LoadingForm";
import { useSelector } from "react-redux";

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const { userid } = auth.user;
  const { data: userProfile, isLoading, isError } = useGetUserQuery(userid);

  let profile;

  if (isLoading) {
    profile = <LoadingForm />;
  } else if (!isLoading && isError) {
    profile = <Alert severity="error">Internal Server Error</Alert>;
  } else if (!isLoading && !isError && userProfile) {
    profile = (
      <EditForm
        title="User Profile"
        id={userProfile._id}
        userEdit={userProfile}
      />
    );
  }
  return profile;
}
