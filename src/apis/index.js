import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

instance.defaults.headers.common[
    "Authorization"
    ] = `Bearer ${window.localStorage.getItem("token")}`;

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    throw new Error()
  }
);

export default instance;
