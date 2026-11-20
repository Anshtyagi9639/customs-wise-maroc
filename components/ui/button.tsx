import Link from "next/link";
import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

/**
 * Button (SITE-BLUEPRINT.md §3):
 *  - primary: brand yellow, default
 *  - outline: on light backgrounds
 *  - ghost:   on dark backgrounds
 * Minimum height 48px. Use `asChild` to wrap a <Link> or <a>.
 */
export const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-brand px-5 py-3 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-70",
  {
    variants: {
      variant: {
        primary: "bg-cargo text-overnight shadow-sm hover:bg-haul",
        outline: "border-2 border-atlantic text-atlantic hover:bg-atlantic hover:text-salt",
        ghost: "border border-salt/40 text-salt hover:bg-salt/10",
      },
      size: {
        md: "",
        lg: "px-7 py-3.5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/** Shorthand for <Button asChild><Link …/></Button> */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link {...props} />
    </Button>
  );
}
