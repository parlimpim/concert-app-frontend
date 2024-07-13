import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHistory } from "@/utils/apiRequest";
import * as queryKeys from "../queryKeys";
import { createHistoryType } from "@/utils/requestTypes";

const useMutateHistory = () => {
  const queryClient = useQueryClient();
  const mutateHistory = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: {
      params: createHistoryType;
      onSuccess: any;
      onError: any;
    }) => {
      const res = await createHistory(params);
      return { res, onSuccess, onError };
    },
    [],
  );

  return useMutation({
    mutationFn: mutateHistory,
    onError: ({ onError }: { onError: any }) => {
      if (onError) {
        onError();
      }
    },
    onSuccess: ({ onSuccess }) => {
      // should invalidate concert
      const historyQueryKey = queryKeys.histories();
      queryClient.invalidateQueries({
        queryKey: historyQueryKey,
        exact: true,
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });
};

export default useMutateHistory;
