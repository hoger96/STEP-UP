"use client";

import { useRenderCtx } from "@/app/_providers/render";
import CommonTable from "@/app/components/Table";
import React, { useEffect, useState } from "react";

export default function NotCountStatus() {
  const renderCtx = useRenderCtx();
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

  const [requestId, setRequestId] = useState<string>();

  const InitHoldStepupTable = async (userId: string, currentPage: number) => {
    await renderCtx?.fetchHoldTable(userId, currentPage);
  };

  const onPageChange = (page: number) => {
    if (!requestId) {
      return;
    }
    InitHoldStepupTable(requestId, page);
  };

  useEffect(() => {
    if (!requestId) {
      return;
    }
    InitHoldStepupTable(requestId, 1);
  }, [requestId]);

  useEffect(() => {
    if (!renderCtx?.isReadMode) {
      setRequestId(renderCtx?.userId);
    } else {
      setRequestId(renderCtx.requestId);
    }
  }, []);

  return (
    <div>
      <CommonTable
        emptyContent={"조회된 데이터가 없습니다."}
        tablekey={"hold-step-table"}
        columns={columns}
        rows={renderCtx?.holdRow}
        uniqueKey={"rowNum"}
        currentPage={renderCtx?.holdCurrentPage}
        total={renderCtx?.holdTotalPage}
        onChange={(page) => onPageChange(page)}
      />
    </div>
  );
}
