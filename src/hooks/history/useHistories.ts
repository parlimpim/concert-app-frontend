import { useQuery } from "@tanstack/react-query";
import * as queryKeys from "../queryKeys";
import { listHistories } from "@/utils/apiRequest";
import { PaginationMetadataType } from "@/utils/pagination";

enum Status {
  RESERVED = "reserved",
  CANCELED = "canceled",
}

export const StatusMap: Record<Status, string> = {
  [Status.RESERVED]: "Reserve",
  [Status.CANCELED]: "Cancel",
};

type StatusKey = keyof typeof Status;
export type StatusType = (typeof Status)[StatusKey];

export type HistoryType = {
  id: string;
  status: StatusType;
  createdAt: string;
  updatedAt: string;
  concert: { name: string };
  user: { name: string; email: string };
};

type HistoryDataType = {
  data: HistoryType[];
  metadata: PaginationMetadataType;
};

const fetchHistories = async ({ queryKey }: { queryKey: any }) => {
  const [, params] = queryKey;

  const response: HistoryDataType = await listHistories(params);

  return response;
};

const useHistories = (params: any) => {
  return useQuery({
    queryKey: queryKeys.histories(params),
    queryFn: fetchHistories,
    staleTime: 300,
    retry: 3,
    placeholderData: { data: [], metadata: {} as PaginationMetadataType },
  });
};

export default useHistories;
