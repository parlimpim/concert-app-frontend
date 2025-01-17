import axiosInstance from "./axiosInstance";
import { createConcertType, createHistoryType } from "./requestTypes";
import { ConcertType, HistoryType, PaginationData } from "./responseTypes";

// concert
export const listConcerts = async (
  params: any,
): Promise<PaginationData<ConcertType>> => {
  const { data } = await axiosInstance.get("/concerts", { params });
  return data;
};

export const createConcert = async (params: createConcertType) => {
  const { data } = await axiosInstance.post("/concerts", params);
  return data;
};

export const deleteConcert = async (id: string) => {
  const data = await axiosInstance.delete(`/concerts/${id}`);
  return data;
};

// history
export const listHistories = async (
  params: any,
): Promise<PaginationData<HistoryType>> => {
  const { data } = await axiosInstance.get("/reservations", { params });
  return data;
};

export const createHistory = async (params: createHistoryType) => {
  const { data } = await axiosInstance.post("/reservations", params);
  return data;
};
