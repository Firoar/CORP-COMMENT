import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { upload_postAxios } from "../apiFetch";
import { queryClient } from "../queryClient";
import { ReviewData } from "../interfaces";

// Define the mutation hook with proper typing
export const useUploadPost = (
  token: string
): UseMutationResult<any, Error, ReviewData, unknown> => {
  return useMutation<any, Error, ReviewData, unknown>({
    mutationFn: (newData: ReviewData) => upload_postAxios(token, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPosts", token] });
    },
  });
};
