import { Input } from '@nextui-org/react'
import React, { ChangeEventHandler, ReactNode } from 'react'

export default function CommonInput(props: {
    value: string | (readonly string[] & string) | undefined; 
    type?: string | undefined; 
    label?: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; 
    labelPlacement?: "outside" | "outside-left" | "inside" | undefined; 
    placeholder?: string | undefined; 
    description?: ReactNode
    isClearable?: boolean | undefined;
    isRequired?: boolean | undefined;
    isDisabled?: boolean | undefined;
    isReadOnly?: boolean | undefined;
    isInvalid?: boolean | undefined;
    errorMessage?: ReactNode;
    onValueChange?: ((value: string) => void) | undefined;
    onClear?: () => any
}) {
  return (
    <div>
    <Input
     classNames={{
      label: "text-left font-semibold w-24",
      input: [
        "min-w-full w-64",
        "placeholder:text-gray-400",
      ]
      }}
        type={props.type ? props.type : 'text'}
        value={props.value}
        label={props.label}
        labelPlacement={props.labelPlacement ? props.labelPlacement : 'outside-left'}
        placeholder={props.placeholder}
        description={props.description}
        errorMessage={props.errorMessage}
        isClearable={props.isClearable ? props.isClearable : false}
        isRequired={props.isRequired}
        isReadOnly={props.isReadOnly}
        isDisabled={props.isDisabled}
        isInvalid={props.isInvalid}
        onValueChange={props.onValueChange}
    />
    </div>
  )
}

