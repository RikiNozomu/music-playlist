import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlaylistType } from "../types";

interface usePlaylistProp {
  enabled?: boolean;
  youtubeId?: string;
}

export const usePlaylist = ({ enabled = true }: usePlaylistProp) => {
  const queryClient = useQueryClient();
  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ["playlists"],
    queryFn: async ({ signal }): Promise<{ data: PlaylistType[] }> => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BACKEND + "/playlist",
        {
          signal,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: enabled,
  });

  const { mutate: AddPlaylist, mutateAsync:AddPlaylistAsync, isPending: isAddPlaylistPending } = useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      await fetch(
        process.env.NEXT_PUBLIC_API_BACKEND + "/playlist",
        {
          body: JSON.stringify({
            title,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
      });
    },
  });

  return {
    data: data?.data,
    refetch,
    isLoadingData: isLoading || isFetching,
    AddPlaylist,
    AddPlaylistAsync,
    isAddPlaylistPending
  };
};
