import { useCallback } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConcert, deleteConcert } from "@/utils/apiRequest";
import * as queryKeys from "../queryKeys";

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
    onError: (error, { onError }) => {
      if (onError) {
        onError();
      }

      if (!silent) {
        toast.error(error.message);
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
        toast.success(res.data.message);
      }
    },
  });
};

export default useMutateDeleteConcert;
