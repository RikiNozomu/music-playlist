"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalProps,
} from "@nextui-org/react";
import React from "react";
import { usePlaylistDetail } from "../../hook/usePlaylistDetail";

interface DeletePlaylistModalProps extends Omit<ModalProps, "children"> {
  playlistId: number;
  onDelete?: () => void;
}

const DeletePlaylistModal = ({
  playlistId,
  onOpenChange,
  onDelete,
  ...props
}: DeletePlaylistModalProps) => {
  const { deletePlayList, isDeletePlayListPending } =
    usePlaylistDetail({ enabled: false, id: playlistId });

  return (
    <Modal onOpenChange={onOpenChange} classNames={{ closeButton: "text-3xl" }} {...props}>
      <ModalContent className="flex flex-col p-4 gap-4">
        <b>Are you sure for delete this playlist?</b>
        <div className="flex flex-row items-center gap-2">
          <Button
            onPress={() => {
              deletePlayList().then(() => {
                if(onDelete){
                  onDelete()
                }
              })
            }}
            color="danger"
            isLoading={isDeletePlayListPending}
            isDisabled={isDeletePlayListPending}
          >
            Yes, Remove this
          </Button>
          <Button
            onPress={() => {
              if (onOpenChange) {
                onOpenChange(false);
              }
            }}
            color="default"
            isLoading={isDeletePlayListPending}
            isDisabled={isDeletePlayListPending}
          >
            Nope
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default DeletePlaylistModal;
