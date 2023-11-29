"use client";

import { useRenderCtx } from "@/app/_providers/render";
import { Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function StepupStatus() {
  const renderCtx = useRenderCtx();

  const [requestId, setRequestId] = useState<string>()

  useEffect(() => {
    if (!requestId) {
      return
    }
    renderCtx?.fetchUserCurrentStatus(requestId)
  }, [requestId]);


  useEffect(() => {
    if (!renderCtx?.isReadMode) {
      setRequestId(renderCtx?.userId)
    } else {
      setRequestId(renderCtx?.requestId)
    }
  }, [renderCtx?.userId]);

  return (
    <div>
      <Card className="rounded-2xl py-2.5 px-4">
        <CardBody>
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
