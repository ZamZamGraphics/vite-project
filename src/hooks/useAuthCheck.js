import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/features/auth/authSlice";
import { getCookie } from "../utils/cookie";
import jwt_decode from "jwt-decode";

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
        const token = auth?.accessToken;
        const user = jwt_decode(token);
        dispatch(
          userLoggedIn({
            accessToken: `Bearer ${auth.accessToken}`,
            user,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}
