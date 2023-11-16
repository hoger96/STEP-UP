"use client";
import { Button } from "@nextui-org/button";
import { MouseEventHandler } from "react";

interface IButtonProps {
  label: string;
  isDisabled?: boolean;
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
  onClick: MouseEventHandler<HTMLButtonElement> | Promise<void> | undefined;
}

export default function CommonButton(props: IButtonProps) {
  return (
    <Button
      isDisabled={props.isDisabled}
      size={props.size}
      radius={props.radius}
      color={props.color}
      variant={props.variant}
      isIconOnly={props.isIconOnly}
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
}
