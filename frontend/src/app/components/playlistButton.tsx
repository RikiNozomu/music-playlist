import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { FiBookmark } from "react-icons/fi";
import AddSongModal from "./modals/addSongModal";

interface PlaylistButtonProps {
  youtubeId: string;
  isFill?: boolean
  onChange?: () => void
}

const PlaylistButton = ({ youtubeId, isFill = false, onChange }: PlaylistButtonProps) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Button variant="light" onPress={() => { setIsOpen(true) }} isIconOnly>
      <FiBookmark
        className="text-default-400"
        size={20}
        fill=""
        fillOpacity={isFill ? 100 : 0}
      />
      <AddSongModal isOpen={isOpen} onOpenChange={(status) => setIsOpen(status)} youtubeId={youtubeId} onChange={onChange}/>
    </Button>
  );
};

export default PlaylistButton;
