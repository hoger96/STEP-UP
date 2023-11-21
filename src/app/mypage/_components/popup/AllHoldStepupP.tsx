import CommonTable from "@/app/components/Table";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ITotalStepupData {
  rowNum: number;
  achievementDt: string;
}

export default function AllHoldStepupP() {
  const columns = [
    {
      key: "rowNum",
      label: "번호",
    },
    {
      key: "holdStartDt",
      label: "보류 시작일",
    },
    {
      key: "holdEndDt",
      label: "보류 종료일",
    },
    {
      key: "holdCntn",
      label: "보류 사유",
    },
  ];

  const userId = sessionStorage.getItem("userId");
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalPage, setTotalPage] = useState<number>();
  const [rows, setRows] = useState<ITotalStepupData[]>([]);

  const getAllHoldStepupData = async (userId: string, currentPage: number) => {
    try {
      const result = await axios.get(
        "/stepup/api/user/entire-list/hold-exercise",
        {
          params: {
            userId,
            currentPage,
            limit: 10,
          },
        }
      );

      return result.data.body;
    } catch (e) {
      console.error(e);
    }
  };

  const initTotalHoldupStepupTable = async (userId: string, currentPage: number) => {
    if (!userId) {
      return;
    }

    const result = await getAllHoldStepupData(userId, currentPage);
    if (result) {
      setRows(result.data);
      setCurrentPage(result.currentPage);
      setTotalPage(result.totalPage);
    }
  };

  const onPageChange = (page: number) => {
    if (!userId) {
      return
    }
    initTotalHoldupStepupTable(userId, page)
  }

  useEffect(() => {
    if (!userId) {
      return
    }
    initTotalHoldupStepupTable(userId, 1);
  }, []);

  return (
    <>
      <CommonTable
        emptyContent={"조회된 데이터가 없습니다."}
        tablekey={"total-hold-stepup-table"}
        columns={columns}
        rows={rows}
        uniqueKey={"rowNum"}
        total={totalPage ?? 0}
        currentPage={currentPage}
        onChange={(page) => onPageChange(page)}
      />
    </>
  );
}
