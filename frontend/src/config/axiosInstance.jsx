import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.68.116:9090/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth");
    // console.log(">>> Token:", token);
    

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.log("Unauthorized");
      localStorage.removeItem("token");
    } else if (status === 404) {
      console.log("API not found");
    } else {
      console.log("Something went wrong");
    }

    return Promise.reject(error);
  }
);