"use client";

import { Button } from "@nextui-org/button";
import { Input, Modal, ModalContent, ModalProps } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { usePlaylistDetail } from "@/app/hook/usePlaylistDetail";

interface RenamePlaylistModalProps extends Omit<ModalProps, "children"> {
  playlistId: number;
  defaultValue?: string;
  onUpdate?: () => void;
}

const RenamePlaylistModal = ({
  playlistId,
  onOpenChange,
  defaultValue = "",
  onUpdate,
  ...props
}: RenamePlaylistModalProps) => {
  const [title, setTitle] = useState(defaultValue || "");

  const { updatePlaylist, isUpdatePlaylistPending } =
    usePlaylistDetail({ enabled: false, id: playlistId });

  useEffect(() => {
    setTitle(defaultValue);
  }, [defaultValue]);
  return (
    <Modal
      onOpenChange={onOpenChange}
      classNames={{ closeButton: "text-3xl" }}
      {...props}
    >
      <ModalContent className="flex flex-col p-4 gap-4">
        <b>Update Playlist</b>
        <Input
          placeholder="create new playlist"
          value={title}
          onValueChange={setTitle}
          isClearable
          isDisabled={isUpdatePlaylistPending}
        />
        <div className="flex flex-row items-center gap-2">
          <Button
            onPress={() => {
              updatePlaylist({ title }).then(() => {
                if(onUpdate){
                  onUpdate()
                }
              })
            }}
            color="success"
            isLoading={isUpdatePlaylistPending}
            isDisabled={isUpdatePlaylistPending}
          >
            Update
          </Button>
          <Button
            onPress={() => {
              if (onOpenChange) {
                onOpenChange(false);
              }
            }}
            color="default"
            isLoading={isUpdatePlaylistPending}
            isDisabled={isUpdatePlaylistPending}
          >
            Cancle
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default RenamePlaylistModal;
