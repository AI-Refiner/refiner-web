import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import HTTP from "../HTTP";
import {
  API_HOST,
  API_URL,
  COGNITO_APP_URL,
  COGNITO_CLIENT_ID,
  COGNITO_REDIRECT_URI,
} from "../Constants";

const Auth = ({ children }) => {
  const location = useLocation();
  const [user, setUserData] = useState({});

  // check local storage for user data, set state if found
  // useEffect(() => {
  //   const localUser = localStorage.getItem("user");
  //   if (localUser != "undefined") {
  //     setUserData(JSON.parse(localUser));
  //   }
  // }, []);

  useEffect(() => {
    var sub =
      new URLSearchParams(location.search).get("sub") ||
      (localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user")).sub
        : null);
    var access_token =
      new URLSearchParams(location.search).get("access_token") ||
      (localStorage.getItem("access_token") !== "undefined"
        ? localStorage.getItem("access_token")
        : null);
    if (sub && access_token) {
      const localUser = { access_token, sub };
      console.log("localUser", localUser);
      localStorage.setItem("user", JSON.stringify(localUser));
      localStorage.setItem("access_token", access_token);
      HTTP.get(`${API_URL}/users/${sub}`)
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          window.history.replaceState({}, document.title, location.pathname);
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          window.location.href = `${COGNITO_APP_URL}/logout?client_id=${COGNITO_CLIENT_ID}&redirect_uri=${COGNITO_REDIRECT_URI}&response_type=code`;
        });
    }
  }, []);

  return <div>{children(user)}</div>;
};

export default Auth;
