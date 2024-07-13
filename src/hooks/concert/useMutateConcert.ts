import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConcert } from "@/utils/apiRequest";
import * as queryKeys from "../queryKeys";
import { createConcertType } from "@/utils/requestTypes";

const useMutateConcert = () => {
  const queryClient = useQueryClient();
  const mutateConcert = useCallback(
    async ({
      params,
      onSuccess,
      onError,
    }: {
      params: createConcertType;
      onSuccess: any;
      onError: any;
    }) => {
      const res = await createConcert(params);
      return { res, onSuccess, onError };
    },
    [],
  );

  return useMutation({
    mutationFn: mutateConcert,
    onError: ({ onError }: { onError: any }) => {
      if (onError) {
        onError();
      }
    },
    onSuccess: ({ onSuccess }) => {
      // should invalidate concert
      const concertsQueryKey = queryKeys.concerts();
      queryClient.invalidateQueries({
        queryKey: concertsQueryKey,
        exact: true,
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });
};

export default useMutateConcert;
