import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.68.118:9090/api",
});

// ✅ Attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.log("Unauthorized");
    } else if (status === 404) {
      console.log("API not found");
    } else {
      console.log("Something went wrong");
    }

    return Promise.reject(error);
  }
);