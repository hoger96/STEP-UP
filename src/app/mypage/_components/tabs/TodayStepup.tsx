"use client";

import { useRenderCtx } from "@/app/_providers/render";
import CommonTable from "@/app/components/Table";
import React, { useEffect, useState } from "react";

export default function TodayStepup() {
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

  const [requestId, setRequestId] = useState<string>();
  const renderCtx = useRenderCtx();

  const initTodayStepupTable = async (userId: string) => {
    await renderCtx?.fetchTodayStepup(userId)
  };

  useEffect(() => {
    if (!requestId) {
      return
    }
    initTodayStepupTable(requestId)
  }, [requestId])

  useEffect(() => {
    if (!renderCtx?.isReadMode) {
      setRequestId(renderCtx?.userId)
    } else {
      setRequestId(renderCtx?.requestId)
    }
  }, [renderCtx?.userId]);



  return (
    <div>
      <CommonTable
        emptyContent={"조회된 데이터가 없습니다."}
        tablekey={"today-step-table"}
        columns={columns}
        rows={renderCtx?.todayRow}
        uniqueKey={"rowNum"}
        total={0}
      />
    </div>
  );
}
