"use client"

import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEventHandler, Key } from "react";

export function CommonSelect(props: {
    data: { value: any; label: any; }[]; 
    value: string | number | readonly string[] | undefined;
    selectValue: "all" | Iterable<Key> | undefined;
    defaultValue?: "all" | Iterable<Key> | undefined;
    label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; 
    labelType?: "outside-left" | "outside" | "inside"; 
    placeholer?: string;
    isInvalid?: boolean;
    errorMessage?: string
    isRequired?: boolean;
    isDisabled?: boolean;
    onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
}) {
  return (
    <div>
      <div>
        <Select 
          labelPlacement={props.labelType}
          label={props.label} 
          value={props.value}
          placeholder={props.placeholer}
          className="max-w-xs" 
          isDisabled={props.isDisabled}
          isRequired={props.isRequired}
          isInvalid={props.isInvalid}
          selectedKeys={props.selectValue}
          onChange={props.onChange}
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