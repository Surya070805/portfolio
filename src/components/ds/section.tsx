import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import { Container } from "@/components/layout/container";

type Props = HTMLAttributes<HTMLElement> & {
  id?: string;
  size?: "sm" | "md" | "lg";
  spacing?: "sm" | "md" | "lg";
  containerSize?: "sm" | "md" | "lg";
  bare?: boolean;
};

const spacings = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-28",
};

export function Section({
  id,
  className,
  spacing = "lg",
  containerSize = "lg",
  bare = false,
  children,
  ...rest
}: Props) {
  return (
    <section id={id} className={cn("relative", spacings[spacing], className)} {...rest}>
      {bare ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}
