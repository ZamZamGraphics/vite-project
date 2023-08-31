import { useGetUserProfileQuery } from "../../../redux/features/users/usersApi";
import EditForm from "./EditForm";

export default function Profile() {
  const { data: userProfile, isLoading, isError } = useGetUserProfileQuery();

  let profile;

  if (isLoading) {
    // loading
  } else if (!isLoading && isError) {
    // error
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
