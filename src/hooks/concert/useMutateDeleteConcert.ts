import { useCallback } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteConcert } from "@/utils/apiRequest";
import * as queryKeys from "../queryKeys";
import { ErrorResponse } from "@/utils/responseTypes";

const useMutateDeleteConcert = (silent: boolean = true) => {
  const queryClient = useQueryClient();
  const mutateDeleteConcert = useCallback(
    async ({
      id,
      onSuccess,
      onError,
    }: {
      id: string;
      onSuccess?: any;
      onError?: any;
    }) => {
      const res = await deleteConcert(id);
      return { res, onSuccess, onError };
    },
    [],
  );

  return useMutation({
    mutationFn: mutateDeleteConcert,
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
        if (res.data.message) {
          toast.success(res.data.message);
        } else {
          toast.success("Successful delete concert");
        }
      }
    },
  });
};

export default useMutateDeleteConcert;
