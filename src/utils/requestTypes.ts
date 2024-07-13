import { StatusType } from "./enums";

export type createConcertType = {
  name: string;
  description: string;
  seat: number;
};

export type createHistoryType = {
  concertId: string;
  status: StatusType;
};
