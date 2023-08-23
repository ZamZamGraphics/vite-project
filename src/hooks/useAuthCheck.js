import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/features/auth/authSlice";
import { getCookie } from "../utils/cookie";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("loggedIn");

    if (localAuth) {
      const auth = {
        loggedIn: getCookie("loggedIn"),
        accessToken: getCookie("accessToken"),
      };
      if (auth?.accessToken && auth?.loggedIn) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}
