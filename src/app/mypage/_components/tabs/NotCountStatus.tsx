"use client";

import { useRenderCtx } from "@/app/_providers/render";
import CommonTable from "@/app/components/Table";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IHoldStepupData {
  rowNum: number;
  holdStartDt: string;
  holdEndDt: string;
  holdCntn: string;
}

interface IProps {
  requestId: string;
}

export default function NotCountStatus(props: IProps) {
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

  const [rows, setRows] = useState<IHoldStepupData[]>([]);
  const router = useRouter();
  const renderCtx = useRenderCtx();

  // const getHoldStepupData = async (userId: string) => {
  //   try {
  //     const result = await axios.get("/stepup/api/user/list/hold-exercise", {
  //       params: {
  //         userId,
  //       },
  //     });
  //     return result.data.body;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const InitHoldStepupTable = async (userId: string) => {
    await renderCtx?.fetchHoldTable(userId);
  };

  useEffect(() => {
    if (props.requestId) {
      InitHoldStepupTable(props.requestId);
    }
  }, [props.requestId]);
  useEffect(() => {
    if (!props.requestId) InitHoldStepupTable(renderCtx?.userId);
  }, [renderCtx?.userId]);

  return (
    <div>
      <CommonTable
        emptyContent={"조회된 데이터가 없습니다."}
        tablekey={"hold-step-table"}
        columns={columns}
        rows={renderCtx?.holdRow}
        uniqueKey={"rowNum"}
        total={0}
      />
    </div>
  );
}
