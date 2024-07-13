import { useInfiniteQuery } from "@tanstack/react-query";
import * as queryKeys from "../queryKeys";
import { listHistories } from "@/utils/apiRequest";

const PAGE_SIZE = 20;

const fetchHistories = async ({ pageParam }: { pageParam: any }) => {
  const response = await listHistories({
    page: pageParam,
    pageSize: PAGE_SIZE,
  });
  return response;
};

const useHistories = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.histories(),
    queryFn: ({ pageParam }) => fetchHistories({ pageParam }),
    initialPageParam: 1,
    retry: 3,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist =
        lastPage.metadata.page < lastPage.metadata.totalPages;
      if (!morePagesExist) return undefined;
      return allPages.length + 1;
    },
  });
};

export default useHistories;
