"use client";

import { useRenderCtx } from "@/app/_providers/render";
import { Card, CardBody } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IStepupStatusData {
  userId: string;
  userNm: string;
  todayStepUpCnt: number;
  todayStepUpFixCnt: number;
  totalStepUpCnt: number;
  mileageCnt: number;
}

interface IProps {
  requestId: string;
}

export default function StepupStatus(props: IProps) {
  const router = useRouter();
  const renderCtx = useRenderCtx();

  // useEffect(() => {
  //   if (!renderCtx?.userId) {
  //     router.push("/login");
  //     return;
  //   }
  // }, []);

  useEffect(() => {
    if (!renderCtx?.userId) router.push("/login");
  });

  useEffect(() => {
    if (props.requestId && renderCtx) {
      renderCtx.fetchSession(props.requestId);
    }
  }, [props.requestId]);

  useEffect(() => {
    if (!props.requestId && renderCtx) {
      renderCtx.fetchSession(renderCtx?.userId);
    }
  }, [renderCtx?.userId]);

  return (
    <div>
      <Card className="rounded-2xl py-2.5 px-4">
        <CardBody>
          {/* <div>
            <span>STEP-UP</span>
          </div> */}
          <div className="m-auto">
            <div className="flex">
              <div className="inline-flex mr-4">
                <span className="mr-4 text-primary font-semibold">TODAY</span>
                <p>{`${renderCtx?.today ?? 0}/3`}</p>
              </div>
              <div className="inline-flex mr-4">
                <span className="mr-4 text-primary-300 font-bold">TOTAL</span>
                <p>{renderCtx?.total ?? 0}</p>
              </div>
              <div className="inline-flex mr-4">
                <span className="mr-4 text-primary-100 font-semibold">
                  MILEAGE
                </span>
                <p>{renderCtx?.mileage ?? 0}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
