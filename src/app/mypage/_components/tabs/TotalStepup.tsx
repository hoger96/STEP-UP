"use client";

import CommonTable from "@/app/components/Table";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ITotalStepupData {
  rowNum: number;
  achievementDt: string;
  mileageUseYn: string;
}

interface IProps {
  shouldRefreshTable: boolean;
  requestId: string;
}

export default function TotalStepup(props: IProps) {
  const columns = [
    {
      key: "rowNum",
      label: "회차",
    },
    {
      key: "achievementDt",
      label: "스텝업 달성일",
    },
    {
      key: "mileageUseYn",
      label: "마일리지 사용 여부",
    },
  ];

  // const userId = sessionStorage.getItem('loginUserId')
  const [rows, setRows] = useState<ITotalStepupData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalPage, setTotalPage] = useState<number>();
  const router = useRouter();

  const getTotalStepupData = async (userId: string, currentPage: number) => {
    try {
      const result = await axios.get("/stepup/api/user/list/exercise", {
        params: {
          currentPage,
          limit: 10,
          userId,
        },
      });
      return result.data.body;
    } catch (e) {
      console.error(e);
    }
  };

  const initTotalSetupTable = async (userId: string, currentPage: number) => {
    if (!userId) {
      router.push("/login");
      return;
    }

    const result = await getTotalStepupData(userId, currentPage);
    if (result) {
      setRows(result.data);
      setCurrentPage(result.currentPage);
      setTotalPage(result.totalPage);
    }
  };

  const onPageChange = (page: number) => {
    if (!props.requestId) {
      return;
    }
    initTotalSetupTable(props.requestId, page);
  };

  useEffect(() => {
    if (props.shouldRefreshTable && props.requestId) {
      initTotalSetupTable(props.requestId, 1);
    }
  }, [props.shouldRefreshTable]);

  useEffect(() => {
    if (!props.requestId) {
      return;
    }

    initTotalSetupTable(props.requestId, 1);
  }, []);

  return (
    <div>
      <CommonTable
        emptyContent={"조회된 데이터가 없습니다."}
        tablekey={"total-step-table"}
        columns={columns}
        rows={rows}
        uniqueKey={"rowNum"}
        currentPage={currentPage}
        total={totalPage ?? 0}
        onChange={(page) => onPageChange(page)}
      />
    </div>
  );
}
