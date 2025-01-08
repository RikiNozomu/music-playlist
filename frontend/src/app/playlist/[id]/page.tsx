"use client";

import { Button, CircularProgress, Tooltip } from "@nextui-org/react";
import { FiPenTool, FiTrash } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import Item from "@/app/components/item";
import { usePlaylistDetail } from "@/app/hook/usePlaylistDetail";
import DeletePlaylistModal from "@/app/components/modals/deletePlaylistModal";
import RenamePlaylistModal from "@/app/components/modals/renamePlaylistModal";
import { useState } from "react";
import { usePlaylist } from "@/app/hook/usePlaylist";

export default function PlaylistDetail() {
  const params = useParams();
  const router = useRouter();
  const { refetch } = usePlaylist({
    enabled: false,
  });
  const { data, isLoadingData, removeSong, isRemoveSongPending } = usePlaylistDetail({
    id: parseInt((params.id as string) || "-1"),
  });
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenRename, setIsOpenRename] = useState(false);
  

  return (
    <div className="flex flex-col gap-2">
      <div className="pt-4 px-4">
        <Button className="w-fit" onPress={() => router.push("/playlist")}>
          Back to Playlist list
        </Button>
      </div>
      {isLoadingData && (
        <div className="flex flex-col items-center h-full space-y-8 p-4 w-full text-xl">
          <CircularProgress />
        </div>
      )}
      {!isLoadingData && !data?.id && (
        <div className="flex flex-col items-center h-full space-y-8 p-4 w-full text-xl">
          <b>Playlist not found</b>
        </div>
      )}
      {!isLoadingData && data?.id && (
        <div className="flex flex-col items-center h-full space-y-8 p-4 w-full text-xl">
          <div className="flex flex-col justify-center w-full gap-2">
            <h1 className="text-left text-4xl">Playlists : {data.title}</h1>
            <div className="flex flex-row items-center">
              <Tooltip content="Rename a Playlist">
                <Button
                  variant="light"
                  onPress={() => setIsOpenRename(true)}
                  isIconOnly
                >
                  <FiPenTool className="text-default-400" size={20} />
                </Button>
              </Tooltip>
              <Tooltip content="Delete a Playlist">
                <Button
                  variant="light"
                  onPress={() => setIsOpenDelete(true)}
                  isIconOnly
                >
                  <FiTrash className="text-default-400" size={20} />
                </Button>
              </Tooltip>
            </div>
          </div>
          {(data.songs.length as number) <= 0 && (<div className="flex flex-col items-center justify-center space-y-8 p-4 w-full text-xl">
              <div className="text-center">
                <b>No any song(s) in this playlist.</b>
                <p>
                  Please back to home, serach any song, and add it in playlist.
                </p>
              </div>
            <div>
              <Button
                color="default"
                size="lg"
                onPress={() => router.push("/")}
              >
                Return Home
              </Button>
            </div>
          </div>)}
          <div className="flex-1 flex flex-col gap-4 w-full">
            {data.songs.map((item) => (
              <Item
                className="p-4 -mb-4 dark:hover:bg-white/20 hover:bg-black/20 rounded-xl transition-all"
                id={item.id}
                title={item.title}
                artist={item.artist}
                thumbnail={item.thumbnail}
                classNames={{
                  content: "hover:cursor-pointer",
                }}
                key={item.id}
                endContent={
                  <div className="flex gap-0 flex-row items-center">
                    {/*<Button variant="light" onPress={(e) => {}} isIconOnly>
                      <FiPlay className="text-default-400" size={20} />
                    </Button>*/}
                    <Button isLoading={isRemoveSongPending} variant="light" onPress={() => removeSong({youtubeId : item.id}) } isIconOnly>
                      <FiTrash
                        className="text-default-400"
                        color="red"
                        size={20}
                      />
                    </Button>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      )}
      <DeletePlaylistModal
        playlistId={data?.id || -1}
        isOpen={isOpenDelete}
        onOpenChange={setIsOpenDelete}
        onDelete={() => {
          refetch();
          setIsOpenDelete(false);
          router.push("/playlist");
        }}
      />
      <RenamePlaylistModal
        playlistId={data?.id || -1}
        isOpen={isOpenRename}
        onOpenChange={setIsOpenRename}
        defaultValue={data?.title}
        onUpdate={() => {
          refetch();
          setIsOpenRename(false);
        }}
      />
    </div>
  );
}
