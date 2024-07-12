import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // send request to get new access token
        const refreshResponse = await axiosInstance.get("/auth/refresh");

        if (refreshResponse.status === 200) {
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // TODO: return reject and handle logout in this of middleware
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
