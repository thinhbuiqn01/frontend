import axios from "axios"; 
import { host } from "../utils/APIRoutes";

const axiosClient = axios.create({
  baseURL: `${host}/api`,  
});

axiosClient.interceptors.request.use( (config) => {
  //const token = localStorage.getItem("auth_token");
  const token = "123";
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response && err.response.status == 401) {
      router.navigate("/login");
      return err;
    }
    throw err;
  }
);

export default axiosClient;
