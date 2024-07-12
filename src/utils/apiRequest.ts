import axiosInstance from "./axiosInstance";

export const listConcerts = async (params: any) => {
  const { data } = await axiosInstance.get("/concerts", { params });
  return data;
};
