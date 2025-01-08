"use client";

import { Button } from "@nextui-org/button";
import {
  CircularProgress,
  Divider,
  Input,
  Modal,
  ModalContent,
  ModalProps,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FiBookmark } from "react-icons/fi";
import { usePlaylist } from "../../hook/usePlaylist";
import { usePlaylistByYoutubeId } from "@/app/hook/usePlaylistByYoutubeId";

interface AddSongModalProps extends Omit<ModalProps, "children"> {
  onChange?: () => void;
  youtubeId: string;
}

const AddSongModal = ({ youtubeId, onChange, ...props }: AddSongModalProps) => {
  const [title, setTitle] = useState("");
  const {
    refetch: refecthAll,
    isAddPlaylistPending,
    AddPlaylistAsync,
  } = usePlaylist({ enabled: false });
  const { data, refetch, isLoadingData, addSong, isEditLoading, removeSong } =
    usePlaylistByYoutubeId({ youtubeId, enabled : Boolean(youtubeId && props.isOpen) });

  useEffect(() => {
    setTitle("");
  }, [data]);

  return (
    <Modal classNames={{ closeButton: "text-3xl" }} {...props}>
      <ModalContent className="flex flex-col p-4 gap-4">
        <b>Choose Playlist</b>
        <div className="flex flex-col max-w-xl gap-4">
          <div className="flex flex-col w-full items-center gap-4">
            {isLoadingData && <CircularProgress />}
            {data?.map((item) => (
              <div
                key={item.id}
                className="flex flex-row gap-4 items-center w-full"
              >
                <span className="flex-1">{item.title}</span>
                <Button
                  className="-m-2"
                  variant="light"
                  isDisabled={isEditLoading}
                  isLoading={isEditLoading}
                  onPress={() => {
                    if (item.hasThisSong) {
                      removeSong({ id: item.id }).then(() => {
                        refecthAll();
                        refetch();
                        if (onChange) {
                          onChange();
                        }
                      });
                    } else {
                      addSong({ id: item.id }).then(() => {
                        refecthAll();
                        refetch();
                        if (onChange) {
                          onChange();
                        }
                      });
                    }
                  }}
                  isIconOnly
                >
                  <FiBookmark
                    fill=""
                    fillOpacity={item.hasThisSong ? 100 : 0}
                    className="text-default-400"
                    size={20}
                  />
                </Button>
              </div>
            ))}
          </div>
          <Divider />
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
                AddPlaylistAsync({ title }).then(() => {
                  refecthAll();
                  refetch();
                  if (onChange) {
                    onChange();
                  }
                });
              }}
              color="default"
              isLoading={isAddPlaylistPending}
              isDisabled={title.length <= 0 || isAddPlaylistPending}
            >
              Create
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default AddSongModal;
