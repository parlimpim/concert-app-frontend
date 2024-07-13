import { UserRoleType } from "@/contexts/userContext";
import axiosInstance from "./axiosInstance";
import { SwitchRoleOkResponse } from "./responseTypes";

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

export const switchRole = async (role: UserRoleType) => {
  const { data } = await axiosInstance.post("/auth/switch-role", { role });
  return data as SwitchRoleOkResponse;
};
