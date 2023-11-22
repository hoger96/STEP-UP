"use client";
import { useEffect, useState } from "react";
import ConfirmTable from "./ConfirmTable";
import { SearchBar } from "./SearchBar";
import axios from "axios";
import CommonButton from "@/app/components/Buttons";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const userId = sessionStorage.getItem("loginUserId");
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
      if (!userId) {
        router.push("/login");
        return;
      }
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

  const handleDownload = async () => {
    try {
      const res = await axios.get(
        "/stepup/api/management/approval-excel-download",
        {
          responseType: "blob",
          params: {
            searchType: searchOption.searchType,
            keyword: searchOption.keyword,
            approvalStatus: searchOption.approvalStatus,
            startDate: searchOption.startDate,
            endDate: searchOption.endDate,
          },
        }
      );
      const name = res.headers["content-disposition"]
        .split("filename=")[1]
        .replace(/"/g, "");
      const url = URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", decodeURIComponent(name));
      link.style.cssText = "display:none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
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
      <CommonButton
        label="엑셀 다운로드"
        color="default"
        variant="solid"
        onClick={() => handleDownload()}
      />
      <ConfirmTable
        onChange={handleChange}
        approvalDataList={fetchDataResult}
        onDateUpdate={setApprovalListData}
      />
    </div>
  );
}
