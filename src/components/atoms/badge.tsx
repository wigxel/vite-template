import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "~/@/lib/utils";
import { AlertTriangleIcon, CheckCircleIcon, XIcon } from "lucide-react";

const badgeClass = cva(
  "inline-flex items-center justify-start gap-2 rounded-2xl",
  {
    variants: {
      variant: {
        warn: "bg-[#FFF9EB] text-[#FFAB00]",
        success: "bg-green-50 text-green-500",
        default: "bg-[#FFFFFF] border border-[#DEE5E7] text-[#57584E]",
        error: "text-[#F05050] bg-[#FFEBEB]",
      },
      size: {
        sm: "px-3 py-1",
        md: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const BadgeIcons = {
  success: CheckCircleIcon,
  error: XIcon,
  warn: AlertTriangleIcon,
  default: CheckCircleIcon,
} as const;

export function Badge(props: {
  type: "success" | "warn" | "default" | "error";
  size?: "sm";
  showIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  const { showIcon = true, size, className } = props;
  const Icon = BadgeIcons[props.type];

  return (
    <span className={cn(badgeClass({ size, variant: props.type }), className)}>
      {showIcon ? <Icon size={"1rem"} /> : null}
      <span className="text-center font-body text-xs font-semibold leading-tight tracking-wide">
        {props.children}
      </span>
    </span>
  );
}
