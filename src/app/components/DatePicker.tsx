"use client";
import { ko } from "date-fns/locale";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function CommonDatePicker({ ...props }: ReactDatePickerProps) {
  return (
    <div className="flex">
      <p className="mt-2">{props.name}</p>
      <ReactDatePicker
        {...props}
        locale={ko}
        shouldCloseOnSelect
        disabledKeyboardNavigation
        dateFormat="yyyy-MM-dd"
        className="border rounded"
      />
    </div>
  );
}
