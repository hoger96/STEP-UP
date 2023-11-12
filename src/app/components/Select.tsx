"use client"

import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEventHandler, Dispatch, Key, SetStateAction } from "react";

export function CommonSelect(props: {
  data: { value: any; label: any; }[]; 
  value?: string | number | readonly string[] | undefined;
  selectValue?: "all" | Iterable<Key> | undefined; // 이미 선택되어있는 값
  defaultValue?: Iterable<Key> | undefined;
  label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; 
  labelType?: "outside-left" | "outside" | "inside"; 
  placeholer?: string;
  isInvalid?: boolean;
  errorMessage?: string
  isRequired?: boolean;
  isDisabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
  onSelectedChange?: (keys: Selection) => any | undefined;
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