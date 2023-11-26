"use client";
import { ko } from "date-fns/locale";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cn from "clsx";

export function CommonDatePicker({ ...props }: ReactDatePickerProps) {
  return (
    <div
      className={cn(props.className, {
        "flex-center-ver": props.name !== undefined,
      })}
    >
      <label
        className={cn(
          "inline-block text-small font-semibold pr-2 w-28 leading-10",
          {
            hidden: props.name === undefined,
          }
        )}
      >
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
