"use client";

import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { ChangeEventHandler, Dispatch, Key, SetStateAction } from "react";

export function CommonSelect(props: {
  data: { value: any; label: any }[];
  value?: string | number | readonly string[];
  selectValue?: "all" | Iterable<Key>; // 이미 선택되어있는 값
  defaultValue?: Iterable<Key>;
  label: string | number | boolean;
  labelType?: "outside-left" | "outside" | "inside";
  placeholer?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onSelectedChange?: SelectProps["onSelectionChange"];
}) {
  return (
    <div>
      <div>
        <Select
          classNames={{
            label: "text-left align-middle mt-2 font-semibold w-64",
          }}
          listboxProps={{
            itemClasses: {
              base: [
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "data-[hover=true]:bg-default-100",
                "dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
              ],
            },
          }}
          popoverProps={{
            classNames: {
              base: "before:bg-default-200",
              content: "p-0 border-small border-divider bg-background",
            },
          }}
          labelPlacement={props.labelType}
          label={props.label}
          value={props.value}
          placeholder={props.placeholer}
          className="max-w-lg"
          isDisabled={props.isDisabled}
          isRequired={props.isRequired}
          isInvalid={props.isInvalid}
          selectedKeys={props.selectValue}
          defaultSelectedKeys={props.defaultValue}
          onChange={props.onChange}
          onSelectionChange={props.onSelectedChange}
          errorMessage={props.errorMessage}
        >
          {props.data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
