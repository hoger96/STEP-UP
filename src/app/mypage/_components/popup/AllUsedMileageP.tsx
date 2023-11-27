import CommonTable from "@/app/components/Table";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ITotalStepupData {
  rowNum: number;
  achievementDt: string;
}

interface IProps {
  requestId: string;
}

export default function AllUsedMileageP(props: IProps) {
  const columns = [
    {
      key: "rowNum",
      label: "번호",
    },
    {
      key: "approvalReqDt",
      label: "신청 일자",
    },
    {
      key: "approvalReqTypeNm",
      label: "신청 타입",
    },
  ];

  // const userId = sessionStorage.getItem('loginUserId')
  const [rows, setRows] = useState<ITotalStepupData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalPage, setTotalPage] = useState<number>();

  const getAllUsedMileageData = async (userId: string, currentPage: number) => {
    try {
      const result = await axios.get("/stepup/api/user/entire-list/mileage", {
        params: {
          userId,
          currentPage,
          limit: 10,
        },
      });
      return result.data.body;
    } catch (e) {
      console.error(e);
    }
  };

  const initTotalUsedMileageTable = async (
    userId: string,
    currentPage: number
  ) => {
    try {
      const result = await getAllUsedMileageData(userId, currentPage);
      if (result) {
        setRows(result.data);
        setCurrentPage(result.currentPage);
        setTotalPage(result.totalPage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onPageChange = (page: number) => {
    if (!props.requestId) {
      return;
    }
    initTotalUsedMileageTable(props.requestId, page);
  };

  useEffect(() => {
    if (!props.requestId) {
      return;
    }
    initTotalUsedMileageTable(props.requestId, 1);
  }, []);

  return (
    <div>
      <CommonTable
        emptyContent={"조회된 데이터가 없습니다."}
        tablekey={"all-mileage-table"}
        columns={columns}
        rows={rows}
        uniqueKey={"rowNum"}
        total={totalPage ?? 0}
        currentPage={currentPage}
        onChange={(page) => onPageChange(page)}
      />
    </div>
  );
}
