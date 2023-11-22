"use client";
import { ko } from "date-fns/locale";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function CommonDatePicker({ ...props }: ReactDatePickerProps) {
  return (
    <div className={props.className}>
      <label className="inline-block text-small font-semibold pr-2">
        {props.name}
      </label>
      <ReactDatePicker
        {...props}
        locale={ko}
        shouldCloseOnSelect
        disabledKeyboardNavigation
        dateFormat="yyyy-MM-dd"
        className="text-small font-medium border rounded-xl py-2 text-center w-32 h-10 cursor-pointer"
      />
    </div>
  );
}
