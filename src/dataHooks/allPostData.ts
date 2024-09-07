import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Post } from "../interfaces";
import { get_all_postAxios } from "../apiFetch";

export const useGetAllPosts = (
  token: string
): UseQueryResult<Post[], Error> => {
  return useQuery<Post[], Error>({
    queryKey: ["allPosts", token],
    queryFn: () => get_all_postAxios(token),
    enabled: !!token,
  });
};
