"use client";

import { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import ThemeSwitchButton from "./themeSwitchButton";
import Link from "./link";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@nextui-org/button";
import { Drawer, DrawerContent } from "@nextui-org/drawer";
import List from "./list";
import { usePlaylist } from "../hook/usePlaylist";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Header = ({ className, ...prop }: HTMLAttributes<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoadingData } = usePlaylist({});
  const onClose = () => setIsOpen(false);
  const router = useRouter();

  return (
    <header {...prop} className={twMerge("p-4 relative", className)}>
      <Drawer
        classNames={{ closeButton: "absolute right-4 top-4" }}
        placement="left"
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerContent className="rounded-none flex flex-col gap-4">
          <div className="text-xl font-bold border-b-1 p-4">Music Playlist</div>
          {isLoadingData && (
            <div className="flex w-full justify-center items-center">
              <CircularProgress />
            </div>
          )}
          {!isLoadingData &&
            data?.map((item) => (
              <List
                key={item.id}
                onAction={(key) => {router.push("/playlist/" + key); onClose();}}
                items={[
                  {
                    key: item.id.toString(),
                    item: <b>{item.title}</b>,
                  },
                ]}
              />
            ))}
        </DrawerContent>
      </Drawer>
      <nav className="md:container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold flex items-center gap-2">
          <Button
            onPress={() => {
              setIsOpen(true);
            }}
            isIconOnly
            className="md:hidden"
            variant="light"
          >
            <GiHamburgerMenu size={24} />
          </Button>
          <Link href={"/"}>Music Playlist</Link>
        </div>
        <ul className="flex space-x-6 items-center pl-4">
          <li>
            <Link href="/" className="">
              Home
            </Link>
          </li>
          <li>
            <Link href="/playlist" className="">
              Playlist
            </Link>
          </li>
          <li>
            <ThemeSwitchButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
