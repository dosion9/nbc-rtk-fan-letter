import axios from "axios";

const instance = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_URL
  baseURL: process.env.REACT_APP_SERVER_URL
});

instance.interceptors.request.use(
  function (config) {
    switch (config.url) {
      case "/user":
        console.log("토큰 로그인");
        const accessToken = localStorage.getItem("accessToken");
        config.headers["Content-Type"] = "application/json";
        config.headers["Authorization"] = `Bearer ${accessToken}`;

        return config;
      default:
        return config;
    }
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
