import React from "react";
import {Button} from "@nextui-org/react";

export default function CommonButton(props:{
  label: string
}) {
  return (
    <Button color="primary">
      {props.label}
    </Button>
  );
}