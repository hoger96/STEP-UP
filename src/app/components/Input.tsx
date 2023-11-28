import { Input } from "@nextui-org/react";
import cn from "clsx";
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  ReactNode,
} from "react";

export default function CommonInput(props: {
  value: string | (readonly string[] & string);
  type?: string;
  label?:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null;
  labelPlacement?: "outside" | "outside-left" | "inside";
  placeholder?: string;
  description?: ReactNode;
  isClearable?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  errorMessage?: ReactNode;
  onValueChange?: (value: string) => void;
  onClear?: () => any;
  className?: string;
  fullWidth?: boolean;
}) {
  return (
    <Input
      classNames={{
        label: "text-left font-semibold w-28",
        input: ["w-64", "placeholder:text-default-200", "caret-primary-50"],
        inputWrapper: ["!bg-white", "border", "shadow-inherit"],
        mainWrapper: cn({ "flex-1": props.fullWidth }),
      }}
      className={props.className}
      type={props.type ? props.type : "text"}
      value={props.value}
      label={props.label}
      labelPlacement={
        props.labelPlacement ? props.labelPlacement : "outside-left"
      }
      placeholder={props.placeholder}
      description={props.description}
      errorMessage={props.errorMessage}
      isClearable={props.isClearable ? props.isClearable : false}
      isRequired={props.isRequired}
      isReadOnly={props.isReadOnly}
      isDisabled={props.isDisabled}
      isInvalid={props.isInvalid}
      onValueChange={props.onValueChange}
      fullWidth={props.fullWidth}
    />
  );
}
