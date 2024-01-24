import axios from "axios";
import {
  COGNITO_APP_URL,
  COGNITO_CLIENT_ID,
  COGNITO_REDIRECT_URI,
  API_HOST,
} from "./Constants";
const instance = axios.create({
  baseURL: API_HOST,
  timeout: 10000,
  crossorigin: true,
});

instance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    const bearer = access_token ? `Bearer ${access_token}` : null;
    config.headers.Authorization = bearer;
    return config;
  },
  (error) => {
    if (error && error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      window.location.href = `${COGNITO_APP_URL}/logout?client_id=${COGNITO_CLIENT_ID}&redirect_uri=${COGNITO_REDIRECT_URI}&response_type=code`;
    }
    return error;
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      window.location.href = `${COGNITO_APP_URL}/logout?client_id=${COGNITO_CLIENT_ID}&redirect_uri=${COGNITO_REDIRECT_URI}&response_type=code`;
    }
    return error;
  }
);

export default instance;
