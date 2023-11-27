"use client";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { ko } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
import cn from "clsx";
export interface CommonTimePickerProps extends ReactDatePickerProps {
  name?: string;
}

export function CommonTimePicker({ name, ...props }: CommonTimePickerProps) {
  return (
    <div className="flex-center-ver">
      <p
        className={cn("inline-block text-small font-semibold pr-2 w-28", {
          hidden: name === undefined,
        })}
      >
        {name}
      </p>
      <ReactDatePicker
        {...props}
        locale={ko}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={1}
        dateFormat="HH:mm"
        timeFormat="HH:mm"
        className="text-small font-medium border rounded-xl py-2 text-center w-32 h-10 cursor-pointer"
      />
    </div>
  );
}
