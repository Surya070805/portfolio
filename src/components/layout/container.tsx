import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
};

export function Container({ className, size = "lg", ...rest }: Props) {
  const max = size === "sm" ? "max-w-3xl" : size === "md" ? "max-w-5xl" : "max-w-6xl";
  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", max, className)}
      {...rest}
    />
  );
}
