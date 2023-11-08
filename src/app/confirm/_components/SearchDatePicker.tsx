"use client";
import React, { useState } from "react";
import { DatePicker } from "@/app/components/DatePicker";
import { ko } from "date-fns/locale";

export function SearchBar() {
  const now = new Date();
  const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className="flex">
      <DatePicker
        name="마일리지 신청 일자"
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
      <DatePicker
        name="~"
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
      />
    </div>
  );
}
