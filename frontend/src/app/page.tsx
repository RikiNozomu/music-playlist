"use client";

import { Button, CircularProgress, Input } from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import Item from "./components/item";
import PlaylistButton from "./components/playlistButton";
import { useSearch } from "./hook/useSearch";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const { refetch, isFetching, isError, data } = useSearch({keyword})

  return (
    <div className="flex flex-col items-center h-full space-y-8 p-4 w-full overflow-x-hidden text-xl">
      <Input
        type="text"
        placeholder="Search Song from Youtube"
        className="max-w-xl"
        classNames={{
          inputWrapper: "py-6",
        }}
        value={keyword}
        onValueChange={setKeyword}
        endContent={
          <Button
            variant="light"
            isIconOnly
            onPress={() => (keyword.length ? refetch() : {})}
          >
            <FiSearch className="text-default-400" size={20} />
          </Button>
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" && keyword.length) {
            refetch();
          }
        }}
      />
      <div className="flex-1 flex flex-col gap-4 w-full overflow-y-auto">
        {isFetching && (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress aria-label="Loading" size="lg" />
          </div>
        )}
        {!isError &&
          !isFetching &&
          (data?.data?.length as number) > 0 &&
          data?.data?.map((item) => (
            <Item
              key={item.id}
              className="p-4 -mb-4 dark:hover:bg-white/20 hover:bg-black/20 rounded-xl transition-all"
              id={item.id}
              title={item.title}
              artist={item.artist}
              thumbnail={item.thumbnail}
              classNames={{
                content: "hover:cursor-pointer",
              }}
              onDoubleClick={() => {
                alert(item.title);
              }}
              endContent={
                <div className="flex gap-0 flex-row items-center">
                  {/*<Button variant="light" onPress={(e) => {}} isIconOnly>
                    <FiPlay className="text-default-400" size={20} />
                  </Button>*/}
                  <PlaylistButton youtubeId={item.id} />
                </div>
              }
            />
          ))}
      </div>
    </div>
  );
}
