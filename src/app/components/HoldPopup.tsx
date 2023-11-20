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
      <div className="m-3">
        <CommonDatePicker
          name="보류 시작일"
          placeholderText="보류 시작일을 선택하세요."
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      </div>
      <div className="m-3">
        <CommonDatePicker
          name="보류 종료일"
          placeholderText="보류 종료일을 선택하세요."
          selected={endDate}
          filterDate={filterEndDate}
          onChange={(date: Date) => setEndDate(date)}
        />
      </div>
      <div className="m-3">
        <Textarea
          value={reason}
          label="보류 사유"
          labelPlacement="outside-left"
          placeholder="보류 사유를 입력해주세요."
          className="max-w-xs"
          isRequired
          onValueChange={setReason}
        />
      </div>
    </div>
  );
};

export default HoldPopup;
