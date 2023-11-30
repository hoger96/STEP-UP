"use client";
import { Button } from "@nextui-org/button";
import { MouseEventHandler, ReactNode } from "react";
import cn from "clsx";

interface IButtonProps {
  label?: string;
  isDisabled?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  radius?: "full" | "lg" | "md" | "sm" | "none";
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  variant:
    | "solid"
    | "faded"
    | "bordered"
    | "light"
    | "flat"
    | "ghost"
    | "shadow";
  isIconOnly?: boolean;
  // IConContents: ReactNode;
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function CommonButton(props: IButtonProps) {
  return (
    <Button
      isDisabled={props.isDisabled}
      fullWidth={props.fullWidth}
      size={props.size}
      radius={props.radius}
      color={props.color}
      variant={props.variant}
      isIconOnly={props.isIconOnly}
      onClick={props.onClick}
      className={cn(props.className)}
    >
      {props.label ? props.label : props.children}
    </Button>
  );
}
