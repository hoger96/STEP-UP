"use client"
import React, { useState } from 'react';
import { DatePicker } from '@/app/components/DatePicker';

export function SearchBar() {
    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    const [startDate, setStartDate] = useState(oneMonthAgo)
    const [endDate, setEndDate] = useState(new Date())
  return (
        <div>
        <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
        />
        <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
        />
        </div>
  );
}