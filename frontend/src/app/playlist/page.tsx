"use client";

import {
  Button,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FiMoreVertical } from "react-icons/fi";
import { useState } from "react";
import Item from "../components/item";
import { useRouter } from "next/navigation";
import { usePlaylist } from "../hook/usePlaylist";
import DeletePlaylistModal from "../components/modals/deletePlaylistModal";
import RenamePlaylistModal from "../components/modals/renamePlaylistModal";
import CreatePlaylistModal from "../components/modals/createPlaylistModal";

export default function Playlist() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenRename, setIsOpenRename] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const { data, refetch, isLoadingData } = usePlaylist({});
  const [selectId, setSelectId] = useState(-1);

  return (
    <div className="flex flex-col items-center h-full space-y-4 p-4 w-full text-xl">
      <h1>Playlists</h1>
      <Button color="default" size="lg" onPress={() => setIsOpen(true)}>
        Create
      </Button>
      {isLoadingData && <CircularProgress size="lg" />}
      <div className="flex flex-col items-center justify-center space-y-8 p-4 w-full text-xl">
        {!data?.length && !isLoadingData && (
          <div className="text-center">
            <b>No any playlist.</b>
          </div>
        )}
      </div>
      {!isLoadingData && (data?.length as number) > 0 && (
        <div className="flex-1 flex flex-col gap-4 w-full container">
          {data?.map((item) => (
            <Item
              key={item.id}
              className="p-4 -mb-4 dark:hover:bg-white/20 hover:bg-black/20 rounded-xl transition-all"
              id={item.id.toString()}
              title={item.title}
              isShowThumbnail={false}
              classNames={{
                content: "hover:cursor-pointer",
              }}
              onDoubleClick={() => router.push("/playlist/" + item.id)}
              endContent={
                <div className="flex gap-0 flex-row items-center">
                  {/*<Button variant="light" onPress={() => {}} isIconOnly>
                    <FiPlay className="text-default-400" size={20} />
                  </Button>*/}
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="light" isIconOnly>
                        <FiMoreVertical
                          className="text-default-400"
                          size={20}
                        />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Playlist Acion">
                      <DropdownItem
                        key="rename"
                        onPress={() => {
                          setSelectId(item.id);
                          setDefaultValue(item.title);
                          setIsOpenRename(true);
                        }}
                      >
                        Rename
                      </DropdownItem>
                      <DropdownItem
                        key="view"
                        onPress={() => router.push("/playlist/" + item.id)}
                      >
                        View
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onPress={() => {
                          setSelectId(item.id);
                          setIsOpenDelete(true);
                        }}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              }
            />
          ))}
        </div>
      )}
      <CreatePlaylistModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onCreate={() => {
          refetch();
          setIsOpen(false);
        }}
      />
      <DeletePlaylistModal
        playlistId={selectId}
        isOpen={isOpenDelete}
        onOpenChange={setIsOpenDelete}
        onDelete={() => {
          refetch();
          setIsOpenDelete(false);
        }}
      />
      <RenamePlaylistModal
        playlistId={selectId}
        isOpen={isOpenRename}
        onOpenChange={setIsOpenRename}
        defaultValue={defaultValue}
        onUpdate={() => {
          refetch();
          setIsOpenRename(false);
        }}
      />
    </div>
  );
}
