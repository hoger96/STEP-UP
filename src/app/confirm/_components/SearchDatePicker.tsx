"use client";
import React, { useState } from "react";
import { CommonDatePicker } from "@/app/components/DatePicker";

export function SearchBar() {
  const now = new Date();
  const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className="flex">
      <CommonDatePicker
        name="마일리지 신청 일자"
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
      <CommonDatePicker
        name="~"
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
      />
    </div>
  );
}
