"use client";

import CommonTable from "@/app/components/Table";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ITodayStepupData {
  rowNum: number;
  startTm: string;
  endTm: string;
}

interface IProps {
  shouldRefreshTable: boolean;
  requestId: string;
}

export default function TodayStepup(props: IProps) {
  const columns = [
    {
      key: "rowNum",
      label: "회차",
    },
    {
      key: "startTm",
      label: "시작시간",
    },
    {
      key: "endTm",
      label: "종료시간",
    },
  ];

  // const [userId, setUserId] = useState<string>()
  const [rows, setRows] = useState<ITodayStepupData[]>([]);
  const router = useRouter();

  const getTodayStepupData = async (userId: string) => {
    try {
      const result = await axios.get("/stepup/api/user/list/today-exercise", {
        params: {
          userId,
        },
      });
      return result.data.body;
    } catch (e) {
      console.error(e);
    }
  };

  const InitTodayStepupTable = async (userId: string) => {
    if (!userId) {
      router.push("/login");
      return;
    }

    const result = await getTodayStepupData(userId);
    if (result) {
      setRows(result);
    }
  };

  useEffect(() => {
    if (props.shouldRefreshTable && props.requestId) {
      InitTodayStepupTable(props.requestId);
    }
  }, [props.shouldRefreshTable]);

  useEffect(() => {
    if (!props.requestId) {
      return;
    }

    InitTodayStepupTable(props.requestId);
  }, [props.requestId]);

  // useEffect(() => {
  //   const loginUserId = sessionStorage.getItem("userId");

  //   if (loginUserId) {
  //     setUserId(loginUserId)
  //   }
  // }, []);

  return (
    <div>
      <CommonTable
        emptyContent={"조회된 데이터가 없습니다."}
        tablekey={"today-step-table"}
        columns={columns}
        rows={rows}
        uniqueKey={"rowNum"}
        total={0}
      />
    </div>
  );
}
