"use client";

import React, { HTMLAttributes } from "react";
import { Image } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

interface SearchResultsProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  artist?: string;
  thumbnail?: string;
  isShowThumbnail?: boolean
  endContent?: React.ReactNode;
  classNames?:{
    content? : string
  }
}

const Item = ({
  title,
  artist,
  thumbnail,
  isShowThumbnail = true,
  className,
  endContent,
  onDoubleClick,
  classNames,
  ...props
}: SearchResultsProps) => {
  return (
    <div
      {...props}
      className={twMerge("p-4 flex gap-4 items-center", className)}
    >
      <div
        className={twMerge("flex gap-4 items-center flex-1 overflow-hidden", classNames?.content)}
        onDoubleClick={onDoubleClick}
      >
        {isShowThumbnail &&<Image
          classNames={{
            img: "object-cover w-[70px] h-[70px]",
            wrapper : "shrink-0"  
          }}
          src={thumbnail || "https://placehold.co/70x70"}
          fallbackSrc="https://placehold.co/70x70"
          alt={title}
          referrerPolicy="no-referrer"
        />}
        <div className="flex flex-col justify-center flex-1 w-full overflow-hidden">
          <h3 className="text-xl truncate">{title}</h3>
          <p className="text-sm font-light truncate">{artist}</p>
        </div>
      </div>

      {endContent}
    </div>
  );
};

export default Item;
