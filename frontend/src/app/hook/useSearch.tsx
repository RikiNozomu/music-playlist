import { useQuery } from "@tanstack/react-query";
import { MusicItemType } from "../types";

interface useSearchProp {
    keyword?:string
}

export const useSearch = ({keyword}: useSearchProp) => {
  const { refetch, isFetching, isError, data } = useQuery({
    queryKey: ["search"],
    queryFn: async ({ signal }): Promise<{ data: MusicItemType[] }> => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BACKEND + "/song/search?keyword=" + keyword,
        {
          signal,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: false,
  });
  return { refetch, isFetching, isError, data };
};
