import { Alert } from "@mui/material";
import { useGetUserProfileQuery } from "../../../redux/features/users/usersApi";
import EditForm from "./EditForm";
import LoadingForm from "./LoadingForm";

export default function Profile() {
  const { data: userProfile, isLoading, isError } = useGetUserProfileQuery();

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
