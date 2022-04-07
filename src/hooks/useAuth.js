import { useState } from "react";
import axios from "axios";
import { APP_URL } from '../config/config'

// Check if is user is authentificated and token match with his
export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const API_URL_VERIFY = APP_URL + "users/verify/token";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (user && token)
    axios.post(API_URL_VERIFY, { user }, config).then((res) => {
      if (res.data.response) {
        setIsAuth(true);
      }
    });

  return isAuth;
};
