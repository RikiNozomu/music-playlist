"use client";

import React, { HTMLAttributes } from "react";
import MusicItem from "./item";
import { Button } from "@nextui-org/button";
import { Slider } from "@nextui-org/react";
import { FiSkipBack, FiPlay, FiSkipForward, FiPause } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

const MusicPlayer = ({ className, ...props} : HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={twMerge("flex flex-col gap-6 p-4 items-center text-sm text-default-400 border-t-1", className)}>
      <div className="flex flex-row container w-full">
        <MusicItem
          className="p-0 flex-1 dark:text-white text-black"
          id={"1"}
          title={"test1"}
          artist={"sdd"}
          thumbnail={"https://img.youtube.com/vi/Ci_zad39Uhw/maxresdefault.jpg"}
        />
        <div className="flex items-center justify-center gap-4">
          <Button variant="light" isIconOnly>
            <FiSkipBack className="w-5 h-5" />
          </Button>
          <Button variant="light" isIconOnly>
            <FiPlay className="w-5 h-5" />
          </Button>
          <Button variant="light" isIconOnly>
            <FiPause className="w-5 h-5" />
          </Button>
          <Button variant="light" isIconOnly>
            <FiSkipForward className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <Slider
        classNames={{
          track: "border-l-0 border-r-0 rounded-full overflow-hidden",
        }}
        aria-label="Player progress"
        className="max-w-2xl mx-32"
        color="foreground"
        defaultValue={0}
        hideThumb={true}
      />
    </div>
  );
};

export default MusicPlayer;
