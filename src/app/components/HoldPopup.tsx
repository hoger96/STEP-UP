"use client";
import { useState } from "react";
import { CommonDatePicker } from "./DatePicker";
import { Textarea } from "@nextui-org/react";

interface IHoldupProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  reason: string;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setReason: React.Dispatch<React.SetStateAction<string>>;
}

const HoldPopup: React.FC<IHoldupProps> = ({
  startDate,
  endDate,
  reason,
  setStartDate,
  setEndDate,
  setReason,
}) => {
  const filterEndDate = (date: Date) => {
    return date >= startDate!;
  };

  return (
    <div>
      <div className="flex items-center mb-3">
        <CommonDatePicker
          name="보류 시작/종료일"
          placeholderText="YYYY-MM-DD"
          selected={startDate}
          minDate={new Date()}
          onChange={(date: Date) => setStartDate(date)}
        />
        <CommonDatePicker
          name="~"
          placeholderText="YYYY-MM-DD"
          selected={endDate}
          filterDate={filterEndDate}
          minDate={startDate}
          onChange={(date: Date) => setEndDate(date)}
          className="ml-2"
        />
      </div>
      <Textarea
        value={reason}
        label="보류 사유"
        labelPlacement="outside-left"
        placeholder="보류 사유를 입력해주세요."
        isRequired
        onValueChange={setReason}
        classNames={{
          base: "flex items-start",
          label: "w-28 text-small font-semibold pr-2",
          inputWrapper: "bg-white hover:!bg-white border",
        }}
      />
    </div>
  );
};

export default HoldPopup;
