import axiosInstance from "./axiosInstance";

export const createUser = async (params: object) => {
  const { data } = await axiosInstance.post("/users/register", params);
  return data.user;
};

export const loginUser = async (params: object) => {
  const { data } = await axiosInstance.post("/auth/login", params);
  return data.user;
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.get("/auth/logout");
  return data;
};
