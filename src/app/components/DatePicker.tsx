"use client";
import { Input } from "@nextui-org/react";
import { ko } from "date-fns/locale";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DatePicker({ ...props }: ReactDatePickerProps) {
  return (
    <div className="flex">
      <p className="mr-5 mt-4">{props.name}</p>
      <ReactDatePicker
        {...props}
        locale={ko}
        customInput={<Input />}
        shouldCloseOnSelect
        disabledKeyboardNavigation
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
}
