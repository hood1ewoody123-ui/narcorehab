"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "ghost" | "primary";
  size?: "sm" | "md";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-body font-medium transition-colors duration-300 focus-visible:outline-none",
        variant === "ghost" &&
          "border border-white/75 bg-transparent text-white hover:bg-white/10",
        variant === "primary" && "bg-teal text-cream hover:bg-teal/90",
        size === "sm" && "px-4 py-2 text-xs tracking-wide",
        size === "md" && "px-7 py-2.5 text-sm tracking-wide",
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export default Button;
