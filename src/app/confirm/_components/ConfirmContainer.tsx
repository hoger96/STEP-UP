"use client";
import { useEffect, useState } from "react";
import ConfirmTable from "./ConfirmTable";
import { SearchBar } from "./SearchBar";
import axios from "axios";

interface ISearchParams extends ICurrentPage {
  searchType?: string;
  keyword?: string;
  approvalStatus?: string;
  startDate?: string;
  endDate?: string;
}
interface ICurrentPage {
  currentPage?: number;
}
interface IManagementApproval {
  rowNum: number;
  approvalId: string;
  userNm: string;
  draftDt: string;
  approvalReqDt: string;
  approvalReqType: string;
  approvalReqTypeNm: string;
  approvalStus: string;
  approvalStusNm: string;
}

interface IWrap<T> {
  data: T[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
}

export default function ConfirmContainer() {
  const [fetchDataResult, setFetchDataResult] =
    useState<IWrap<IManagementApproval>>(); // 결재 현황 API 조회 결과
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1); // 시작할 때만 동작
  const [searchOption, setSearchOption] = useState<ISearchParams>({
    searchType: "ALL",
    keyword: "",
    approvalStatus: "ALL",
    startDate: oneMonthAgo.toISOString().split("T")[0],
    endDate: now.toISOString().split("T")[0],
    currentPage: 1,
  });
  const handleSearch = (searchParams: ISearchParams) => {
    setSearchOption(searchParams);
  };
  const handleChange = (changePage: number) => {
    setSearchOption({
      ...searchOption,
      currentPage: changePage,
    });
  };

  const getApprovalListData = async (searchOption: ISearchParams) => {
    try {
      const result = await axios.get("/stepup/api/management/approval", {
        params: {
          searchType: searchOption.searchType,
          keyword: searchOption.keyword,
          approvalStatus: searchOption.approvalStatus,
          startDate: searchOption.startDate,
          endDate: searchOption.endDate,
          currentPage: searchOption.currentPage,
        },
      });
      return result.data.body;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const setApprovalListData = async () => {
    try {
      const result = await getApprovalListData(searchOption);
      setFetchDataResult(result);
    } catch (error) {
      console.error("Error setting data:", error);
    }
  };

  useEffect(() => {
    setApprovalListData();
  }, [searchOption]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ConfirmTable
        onChange={handleChange}
        approvalDataList={fetchDataResult}
        onDateUpdate={setApprovalListData}
      />
    </div>
  );
}
