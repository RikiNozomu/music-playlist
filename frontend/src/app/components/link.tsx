import NextLink, { LinkProps as BaseLinkProps } from "next/link";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface LinkProps extends BaseLinkProps {
  className?: string;
}

const Link = ({
  children,
  className,
  ...props
}: PropsWithChildren<LinkProps>) => {
  return (
    <NextLink className={twMerge("hover:opacity-60", className)} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
