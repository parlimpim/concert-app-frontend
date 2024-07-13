import { useInfiniteQuery } from "@tanstack/react-query";
import * as queryKeys from "../queryKeys";
import { listConcerts } from "@/utils/apiRequest";

const fetchConcerts = async ({ pageParam }: { pageParam: any }) => {
  const { data, metadata } = await listConcerts({ page: pageParam });

  return { data, metadata };
};

const useConcerts = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.concerts(),
    queryFn: ({ pageParam }) => fetchConcerts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist =
        lastPage.metadata.page < lastPage.metadata.totalPages;
      if (!morePagesExist) return undefined;
      return allPages.length + 1;
    },
  });
};

export default useConcerts;
