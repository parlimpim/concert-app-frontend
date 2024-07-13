// Reservation status
export enum Status {
  RESERVED = "reserved",
  CANCELED = "canceled",
}

export const StatusMap: Record<Status, string> = {
  [Status.RESERVED]: "Reserve",
  [Status.CANCELED]: "Cancel",
};

type StatusKey = keyof typeof Status;
export type StatusType = (typeof Status)[StatusKey];

// User role
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

type UserRoleKey = keyof typeof UserRole;
export type UserRoleType = (typeof UserRole)[UserRoleKey];
