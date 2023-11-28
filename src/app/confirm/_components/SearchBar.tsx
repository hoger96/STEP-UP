"use client";
import React, { useEffect, useState } from "react";
import { CommonDatePicker } from "@/app/components/DatePicker";
import { CommonSelect } from "@/app/components/Select";
import CommonInput from "@/app/components/Input";
import CommonButton from "@/app/components/Buttons";

interface ISearchParams {
  searchType?: string;
  keyword?: string;
  approvalStatus?: string;
  startDate?: string;
  endDate?: string;
  currentPage?: number;
}

export function SearchBar({
  onSearch,
}: {
  onSearch: (searchParams: ISearchParams) => void;
}) {
  const now = new Date();
  const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(new Date());

  const statusData = [
    { label: "전체", value: "ALL" },
    { label: "대기", value: "WAIT" },
    { label: "반려", value: "REJECT" },
    { label: "승인", value: "APPROVAL" },
    { label: "사용자 취소", value: "CANCEL" },
  ];
  const [approvalStatus, setApprovalStatus] = useState<string[]>([]);
  function handleSelectStatus(e: any) {
    setApprovalStatus([e.target.value]);
  }

  useEffect(() => {
    setApprovalStatus(["ALL"]);
  }, []);

  const [keyword, setKeyword] = useState<string>("");

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") handleSearch();
  };

  const handleSearch = () => {
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];

    const searchParams = {
      searchType: "USER_NM",
      keyword: keyword,
      approvalStatus: approvalStatus?.toString(),
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      currentPate: 1,
    };
    onSearch(searchParams);
  };

  const filterEndDate = (date: Date) => {
    return date >= startDate!;
  };

  return (
    <div className="flex bg-gray-100 rounded-2xl py-2.5 px-4 justify-between">
      <div className="flex-center-ver mr-3">
        <CommonDatePicker
          name="결재 신청 일자"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
        <span className="inline-block text-small font-semibold mx-2">~</span>
        <CommonDatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          filterDate={filterEndDate}
        />
      </div>
      <CommonSelect
        data={statusData}
        selectValue={approvalStatus}
        label="결재 상태"
        labelType="outside-left"
        onChange={handleSelectStatus}
        className="mr-1"
      />
      {/* <CommonSelect
        data={searchData}
        selectValue={searchType}
        label="검색 조건"
        labelType="outside-left"
        onChange={handleSelectCondition}
      /> */}
      <div className="flex flex-1">
        <div className="mr-2 flex-1" onKeyUp={handleKeyUp}>
          <CommonInput
            value={keyword || ""}
            placeholder="사원 명을 입력해 주세요."
            onValueChange={setKeyword}
            fullWidth
          />
        </div>
        <CommonButton
          label="검색"
          size="md"
          radius="md"
          color="primary"
          variant="solid"
          onClick={() => handleSearch()}
        />
      </div>
    </div>
  );
}
function dayjs(startDate: Date): any {
  throw new Error("Function not implemented.");
}
