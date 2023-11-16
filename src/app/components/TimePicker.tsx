"use client";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { ko } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";

export interface CommonTimePickerProps extends ReactDatePickerProps {
  name: string;
}

export function CommonTimePicker({ name, ...props }: CommonTimePickerProps) {
  return (
    <div className="flex">
      <p className="mt-2">{name}</p>
      <ReactDatePicker
        {...props}
        locale={ko}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        dateFormat="HH:mm"
        timeFormat="HH:mm"
        className="border rounded"
      />
    </div>
  );
}