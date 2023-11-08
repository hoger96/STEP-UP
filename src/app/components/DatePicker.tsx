"use client";

import { ko } from 'date-fns/locale';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function DatePicker({...props}: ReactDatePickerProps){

  return (
    <ReactDatePicker 
    {...props}
    disabledKeyboardNavigation 
    locale={ko}
    dateFormat="yyyy/MM/dd"
    />
  );
};