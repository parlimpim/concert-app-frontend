import { useCallback } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as queryKeys from "../queryKeys";
import { createConcert } from "@/utils/apiRequest";
import { createConcertType } from "@/utils/requestTypes";
import { ErrorResponse } from "@/utils/responseTypes";
import { formatErrorMessage } from "@/utils/formatData";

const useMutateConcert = (silent: boolean = true) => {
  const queryClient = useQueryClient();
  const mutateConcert = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: {
      params: createConcertType;
      onSuccess?: any;
      onError?: any;
    }) => {
      const res = await createConcert(params);
      return { res, onSuccess, onError };
    },
    [],
  );

  return useMutation({
    mutationFn: mutateConcert,
    onError: (error: AxiosError<ErrorResponse>, { onError }) => {
      if (onError) {
        onError();
      }

      if (!silent) {
        if (error.response) {
          const { message } = error.response.data;
          const errorMessage = formatErrorMessage(message);
          toast.error(errorMessage);
        }
      }
    },
    onSuccess: ({ onSuccess, res }) => {
      // should invalidate concert
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
          toast.success("Successful create concert");
        }
      }
    },
  });
};

export default useMutateConcert;
