import { useCallback } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHistory } from "@/utils/apiRequest";
import * as queryKeys from "../queryKeys";
import { createHistoryType } from "@/utils/requestTypes";
import { ErrorResponse } from "@/utils/responseTypes";

const useMutateHistory = (silent: boolean = true) => {
  const queryClient = useQueryClient();
  const mutateHistory = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: {
      params: createHistoryType;
      onSuccess?: any;
      onError?: any;
    }) => {
      const res = await createHistory(params);
      return { res, onSuccess, onError };
    },
    [],
  );

  return useMutation({
    mutationFn: mutateHistory,
    onError: (error: AxiosError<ErrorResponse>, { onError }) => {
      if (onError) {
        onError();
      }

      if (!silent) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    },
    onSuccess: ({ onSuccess, res }, { params }) => {
      // should invalidate history and concert
      const historyQueryKey = queryKeys.histories();
      queryClient.invalidateQueries({
        queryKey: historyQueryKey,
        exact: true,
      });

      const concertsQueryKey = queryKeys.concerts();
      queryClient.invalidateQueries({
        queryKey: concertsQueryKey,
        exact: true,
      });

      if (onSuccess) {
        onSuccess();
      }

      if (!silent) {
        if (res.message) {
          toast.success(res.message);
        } else {
          toast.success(`Concert is ${params.status} successfully`);
        }
      }
    },
  });
};

export default useMutateHistory;
