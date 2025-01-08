'use client';

import { Listbox, ListboxItem, ListboxItemProps, ListboxSlots, SlotsToClasses } from "@nextui-org/react";
import { HTMLAttributes, Key, ReactNode } from "react";

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
  items: {
    key: string;
    item: ReactNode | string,
    props?: ListboxItemProps
  }[];
  classNames?: SlotsToClasses<ListboxSlots>
  onAction?: (key: Key) => void;
}

export default function List({ items , onAction, classNames, ...props }: ListProps) {
  return (
    <div {...props}>
      <Listbox
        classNames={classNames}
        aria-label="Actions"
        onAction={(key) => {
          if (onAction) onAction(key);
        }}
      >
        {items.map(({ key, item, props }) => (
          <ListboxItem {...props} aria-label={key} key={key}>{item}</ListboxItem>
        ))}
      </Listbox>
    </div>
  );
}
