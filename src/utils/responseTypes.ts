import { UserType } from "@/contexts/userContext";

type OkResponse = {
  success: boolean;
  message?: string;
};

export type ErrorResponse = {
  error: string;
  message: string | [];
  statusCode: number;
};

export type SwitchRoleOkResponse = {
  user: UserType;
} & OkResponse;
