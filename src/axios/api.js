import axios from "axios";

const instance = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_URL
  baseURL: process.env.REACT_APP_SERVER_URL
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");

    switch (config.url) {
      case "/user":
        console.log("토큰 로그인");
        config.headers["Content-Type"] = "application/json";
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
      case "/profile":
        console.log("프로필 변경");
        config.headers["Content-Type"] = "multipart/form-data";
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
    console.log("api.js 오류");
    return Promise.reject(error);
  }
);
export default instance;
