import { Alert } from "@mui/material";
import { useGetUserQuery } from "../../../redux/features/users/usersApi";
import EditForm from "./EditForm";
import LoadingForm from "./LoadingForm";
import jwt_decode from "jwt-decode";
import { getCookie } from "../../../utils/cookie";

const token = getCookie("accessToken");
const loggedUser = token ? jwt_decode(token) : false;
const { userid } = loggedUser || null;

export default function Profile() {
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
