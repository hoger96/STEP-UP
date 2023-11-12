"use client";
import React, { useEffect, useState } from "react";
import { CommonDatePicker } from "@/app/components/DatePicker";
import { CommonSelect } from "@/app/components/Select";
import CommonInput from "@/app/components/Input";
import CommonButton from "@/app/components/Buttons";

export function SearchBar() {
  const now = new Date();
  const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(new Date());

  const statusData = [
    { label: "전체", value: "ALL" },
    { label: "대기", value: "wait" },
    { label: "반려", value: "fail" },
    { label: "완료", value: "success" },
  ];
  const [confirmStatus, setconfirmStatus] = useState<string[]>();
  function handleSelectStatus(e: any) {
    setconfirmStatus([e.target.value]);
  }

  const searchData = [
    { label: "전체", value: "ALL" },
    { label: "사원 명", value: "name" },
  ];
  const [searchCondition, setsearchCondition] = useState<string[]>();
  function handleSelectCondition(e: any) {
    setsearchCondition([e.target.value]);
  }
  useEffect(() => {
    setconfirmStatus(["ALL"]);
    setsearchCondition(["ALL"]);
  }, []);

  const [keyword, setKeyword] = useState<string>("");

  const clickButton = () => {
    console.log(
      "startDate: ",
      JSON.stringify(startDate).replace(/T.*/, ""),
      "endDate: ",
      JSON.stringify(endDate).replace(/T.*/, ""),
      "결재상태: ",
      confirmStatus,
      "검색조건: ",
      searchCondition,
      "검색어: ",
      keyword
    );
  };

  return (
    <div className="flex bg-white rounded-2xl p-2 justify-between">
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
      <div>
        <CommonSelect
          data={statusData}
          selectValue={confirmStatus}
          label="결재 상태"
          labelType="outside-left"
          onChange={handleSelectStatus}
        />
      </div>
      <div>
        <CommonSelect
          data={searchData}
          selectValue={searchCondition}
          label="검색 조건"
          labelType="outside-left"
          onChange={handleSelectCondition}
        />
      </div>
      <div className="flex">
        <div className="mr-2">
          <CommonInput
            value={keyword}
            placeholder="검색어를 입력해 주세요."
            onValueChange={setKeyword}
          />
        </div>
        <div>
          <CommonButton
            label="검색"
            size="md"
            radius="md"
            color="default"
            variant="solid"
            onClick={() => clickButton()}
          />
        </div>
      </div>
    </div>
  );
}
function dayjs(startDate: Date): any {
  throw new Error("Function not implemented.");
}
