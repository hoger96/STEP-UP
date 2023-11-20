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
  ];
  const [approvalStatus, setApprovalStatus] = useState<string[]>();
  function handleSelectStatus(e: any) {
    setApprovalStatus([e.target.value]);
  }

  const searchData = [
    { label: "전체", value: "ALL" },
    { label: "사원 명", value: "USER_NM" },
  ];
  const [searchType, setSearchType] = useState<string[]>();
  function handleSelectCondition(e: any) {
    setSearchType([e.target.value]);
  }
  useEffect(() => {
    setApprovalStatus(["ALL"]);
    setSearchType(["ALL"]);
  }, []);

  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = () => {
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];

    const searchParams = {
      searchType: searchType?.toString(),
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
    <div className="flex bg-gray-100 rounded-2xl p-2 justify-between">
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
          filterDate={filterEndDate}
        />
      </div>
      <div>
        <CommonSelect
          data={statusData}
          selectValue={approvalStatus}
          label="결재 상태"
          labelType="outside-left"
          onChange={handleSelectStatus}
        />
      </div>
      <div>
        <CommonSelect
          data={searchData}
          selectValue={searchType}
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
            onClick={() => handleSearch()}
          />
        </div>
      </div>
    </div>
  );
}
function dayjs(startDate: Date): any {
  throw new Error("Function not implemented.");
}
