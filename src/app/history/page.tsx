import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ReservationHistory from "./reservationHistory";
import { listHistories } from "@/utils/apiRequest";
import * as queryKeys from "../../hooks/queryKeys";

const History = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.histories({}),
    queryFn: listHistories,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReservationHistory />
    </HydrationBoundary>
  );
};

export default History;
