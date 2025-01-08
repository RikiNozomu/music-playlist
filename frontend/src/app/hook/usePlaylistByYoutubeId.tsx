import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlaylistType } from "../types";

interface usePlaylistProp {
  youtubeId: string;
  enabled?: boolean;
}

export const usePlaylistByYoutubeId = ({ youtubeId, enabled = true }: usePlaylistProp) => {
  const queryClient = useQueryClient();
  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ["playlists-" + youtubeId],
    queryFn: async ({ signal }): Promise<{ data: PlaylistType[] }> => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BACKEND +
          "/playlist" +
          (youtubeId ? "?youtubeId=" + youtubeId : ""),
        {
          signal,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled,
  });

  const { mutateAsync: addSong, isPending: isAddSongPending } = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      await fetch(
        process.env.NEXT_PUBLIC_API_BACKEND + "/playlist/" + id + "/add",
        {
          body: JSON.stringify({
            id: youtubeId,
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
        queryKey: ["playlists-" + youtubeId],
      });
    },
  });

  const { mutateAsync: removeSong, isPending: isRemoveSongPending } =
    useMutation({
      mutationFn: async ({ id }: { id: number }) => {
        await fetch(
          process.env.NEXT_PUBLIC_API_BACKEND +
            "/playlist/" +
            id +
            "/remove/" +
            youtubeId,
          {
            method: "DELETE",
          }
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["playlists-" + youtubeId],
        });
      },
    });

  return {
    data: data?.data,
    refetch,
    isLoadingData: isLoading || isFetching,
    addSong,
    removeSong,
    isEditLoading: isAddSongPending || isRemoveSongPending,
  };
};
