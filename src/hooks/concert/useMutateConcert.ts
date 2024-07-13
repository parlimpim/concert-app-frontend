import { useCallback } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConcert } from "@/utils/apiRequest";
import * as queryKeys from "../queryKeys";
import { createConcertType } from "@/utils/requestTypes";
import { ErrorResponse } from "@/utils/responseTypes";

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
          if (Array.isArray(message)) {
            toast.error(error.response.data.message[0]);
          }

          toast.error(message);
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
