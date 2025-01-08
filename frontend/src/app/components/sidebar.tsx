"use client";

import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import List from "./list";
import { useRouter } from "next/navigation";
import { usePlaylist } from "../hook/usePlaylist";
import { CircularProgress } from "@nextui-org/react";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  expanded?: boolean;
}

const Sidebar = ({ className, ...props }: SidebarProps) => {
  const router = useRouter();
  const { data, isLoadingData } = usePlaylist({});

  return (
    <div
      {...props}
      className={twMerge(
        "flex flex-col h-full w-full p-4 md:shrink-0",
        className
      )}
    >
      <h2 className="text-xl font-bold mb-4">My Playlists</h2>
      {isLoadingData && (
        <div className="flex w-full justify-center items-center">
          <CircularProgress />
        </div>
      )}
      {!isLoadingData &&
        data?.map((item) => (
          <List
            key={item.id}
            onAction={(key) => router.push("/playlist/" + key)}
            items={[
              {
                key: item.id.toString(),
                item: <b>{item.title}</b>,
              },
            ]}
          />
        ))}
    </div>
  );
};

export default Sidebar;
