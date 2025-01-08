import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlaylistType } from "../types";

interface usePlaylistProp {
  enabled?: boolean;
  id: number;
}

export const usePlaylistDetail = ({ enabled = true, id }: usePlaylistProp) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["playlist", id],
    queryFn: async ({ signal }): Promise<{ data: PlaylistType }> => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BACKEND + "/playlist/" + id,
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

  const {
    mutateAsync: updatePlaylist,
    isPending: isUpdatePlaylistPending,
    isSuccess: isUpdatePlayListSuccess,
  } = useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      await fetch(
        process.env.NEXT_PUBLIC_API_BACKEND + "/playlist/" + id,
        {
          body: JSON.stringify({
            title,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist", id],
      });
    },
  });

  const {
    mutateAsync: deletePlayList,
    isPending: isDeletePlayListPending,
    isSuccess: isDeletePlayListSuccess,
  } = useMutation({
    mutationFn: async () => {
      await fetch(process.env.NEXT_PUBLIC_API_BACKEND + "/playlist/" + id, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist", id],
      });
    },
  });

  const { mutate: removeSong, isPending: isRemoveSongPending } =
    useMutation({
      mutationFn: async ({ youtubeId }: { youtubeId: string }) => {
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
          queryKey: ["playlist", id],
        });
      },
    });

  return {
    data: data?.data,
    isLoadingData: isLoading || isFetching,
    updatePlaylist,
    isUpdatePlaylistPending,
    isUpdatePlayListSuccess,
    deletePlayList,
    isDeletePlayListPending,
    isDeletePlayListSuccess,
    removeSong,
    isRemoveSongPending
  };
};
