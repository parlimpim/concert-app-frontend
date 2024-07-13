import { useQuery } from "@tanstack/react-query";
import * as queryKeys from "../queryKeys";
import { listConcerts } from "@/utils/apiRequest";

const fetchConcerts = async ({ queryKey }: { queryKey: any }) => {
  const [, params] = queryKey;

  const { data, metadata } = await listConcerts(params);

  return { data, metadata };
};

const useConcerts = (params: any) => {
  return useQuery({
    queryKey: queryKeys.concerts(params),
    queryFn: fetchConcerts,
    staleTime: 300,
    retry: 3,
    placeholderData: { data: [], metadata: {} },
  });
};

export default useConcerts;
