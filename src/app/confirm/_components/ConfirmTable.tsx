"use client";
import CommonTable from "@/app/components/Table";
import axios from "axios";
import { useEffect, useState } from "react";

interface ISearchParams {
  searchType: string;
  keyword: string;
  approvalStatus: string;
  startDate: string;
  endDate: string;
  currentPage: number;
  limit: number;
}

interface IWrap<T> {
  totalCount: number;
  data: T[];
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

export default function ConfirmTable({
  searchData,
}: {
  searchData: ISearchParams | null;
}) {
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1);
  const searchOption = {
    searchType: "ALL",
    keyword: "",
    approvalStatus: "ALL",
    startDate: oneMonthAgo.toISOString().split("T")[0],
    endDate: now.toISOString().split("T")[0],
    currentPage: 1,
    limit: 10,
  };
  if (searchData) {
    (searchOption.searchType = searchData.searchType),
      (searchOption.keyword = searchData.keyword),
      (searchOption.approvalStatus = searchData.approvalStatus),
      (searchOption.startDate = searchData.startDate),
      (searchOption.endDate = searchData.endDate);
  }
  const [data, setData] = useState<IManagementApproval[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const approvalColumns = [
    {
      key: "rowNum",
      label: "번호",
    },
    {
      key: "userNm",
      label: "사원 명",
    },
    {
      key: "draftDt",
      label: "결재 신청 일자",
    },
    {
      key: "approvalReqDt",
      label: "마일리지 신청 일자",
    },
    {
      key: "approvalReqTypeNm",
      label: "신청 타입",
    },
    {
      key: "approvalStusNm",
      label: "결재 상태",
    },
  ];

  const fetchData = async (searchOption: ISearchParams) => {
    try {
      const result = await axios.get("/stepup/api/management/approval", {
        params: {
          searchType: searchOption.searchType,
          keyword: searchOption.keyword,
          approvalStatus: searchOption.approvalStatus,
          startDate: searchOption.startDate,
          endDate: searchOption.endDate,
          currentPage: searchOption.currentPage,
          limit: searchOption.limit,
        },
      });
      setData(result.data.body.data);
      setTotalCount(result.data.body.totalCount);
      setTotalPage(result.data.body.totalPage);
      setCurrentPage(result.data.body.currentPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    fetchData({
      ...searchOption,
      currentPage: page,
    });
  };

  const handleOpenPopup = (e: Event) => {
    console.log("key", e);
  };

  useEffect(() => {
    fetchData(searchOption);
  }, [searchData]);

  return (
    <div>
      <span>총 {totalCount} 개</span>
      <div>
        <CommonTable
          tablekey="approvalId"
          uniqueKey="approvalId"
          columns={approvalColumns}
          rows={data?.length > 0 ? data : []}
          emptyContent={"조회된 데이터가 없습니다."}
          page={currentPage}
          total={totalPage}
          onChange={handleChangePage}
          onRowAction={(item) => {
            console.log(item);
          }}
        />
      </div>
    </div>
  );
}
