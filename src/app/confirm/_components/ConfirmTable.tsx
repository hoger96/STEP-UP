"use client";
import CommonTable from "@/app/components/Table";
import { useEffect, useState } from "react";

interface ISearchParams {
  searchType: string;
  keyword: string;
  approvalStatus: string;
  startDate: string;
  endDate: string;
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
  const [data, setData] = useState<IWrap<IManagementApproval> | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
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
      key: "approvalReqtype",
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

  const fetchData = async () => {
    try {
      const response = await (
        await fetch(
          `/stepup/api/management/approval?searchType=${searchData?.searchType}&keyword=${searchData?.keyword}&approvalStatus=${searchData?.approvalStatus}&startDate=${searchData?.startDate}&endDate=${searchData?.endDate}&currentPage=1&limit=10`
        )
      ).json();
      const result = response.body;
      setData(result.data);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (searchData) {
      fetchData();
    }
  }, [searchData]);

  return (
    <div>
      <span>총 {totalCount} 개</span>
      <div>
        Data: {JSON.stringify(data)}
        {/* <CommonTable
          tablekey="approvalId"
          columns={approvalColumns}
          rows={data ? [data] : []}
          emptyContent={"조회된 데이터가 없습니다."}
          pages={5}
        /> */}
      </div>
    </div>
  );
}
