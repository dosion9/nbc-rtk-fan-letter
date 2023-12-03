import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_JSON_SERVER_URL
});

instance.interceptors.request.use(
  async function (config) {
    return config;
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
