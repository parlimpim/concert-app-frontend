import { UserType } from "@/contexts/userContext";
import { StatusType } from "./enums";

export type PaginationMetadataType = {
  itemCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};

export type PaginationData<T> = {
  data: T[];
  metadata: PaginationMetadataType;
};

type OkResponse = {
  success: boolean;
  message?: string;
};

export type ErrorResponse = {
  error: string;
  message: string | [];
  statusCode: number;
};

// auth
export type SwitchRoleOkResponse = {
  user: UserType;
} & OkResponse;

// concert
export type ConcertType = {
  id: string;
  name: string;
  description: string;
  seat: number;
  availableSeats: number;
  createdAt: Date;
  updatedAt: Date;
  isReserved: boolean;
};

// history
export type HistoryType = {
  id: string;
  status: StatusType;
  createdAt: string;
  updatedAt: string;
  concert: { name: string };
  user: { name: string; email: string };
};
