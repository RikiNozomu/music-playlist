"use client";

import { Button } from "@nextui-org/button";
import {
  Input,
  Modal,
  ModalContent,
  ModalProps,
} from "@nextui-org/react";
import React, { useState } from "react";
import { usePlaylist } from "../../hook/usePlaylist";

interface CreatePlaylistModalProps extends Omit<ModalProps, "children"> {
  onCreate?: () => void;
}

const CreatePlaylistModal = ({
  onCreate,
  ...props
}: CreatePlaylistModalProps) => {
  const [title, setTitle] = useState("");
  const { isAddPlaylistPending, AddPlaylist } = usePlaylist({ enabled: false });

  return (
    <Modal classNames={{ closeButton: "text-3xl" }} {...props}>
      <ModalContent className="flex flex-col p-4 gap-4">
        <b>Create Playlist</b>
        <div className="flex flex-row items-center gap-2">
          <Input
            placeholder="create new playlist"
            value={title}
            onValueChange={setTitle}
            isClearable
            isDisabled={isAddPlaylistPending}
          />
          <Button
            onPress={() => {
              if (onCreate) {
                onCreate();
              }
              AddPlaylist({ title });
            }}
            color="default"
            isLoading={isAddPlaylistPending}
            isDisabled={title.length <= 0 || isAddPlaylistPending}
          >
            Create
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default CreatePlaylistModal;
