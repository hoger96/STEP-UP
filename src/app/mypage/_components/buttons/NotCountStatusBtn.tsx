"use client";

import CommonButton from "@/app/components/Buttons";
import CommonModal from "@/app/components/Confirm";
import React, { useEffect, useState } from "react";
import AllHoldStepupP from "../popup/AllHoldStepupP";
import { useRenderCtx } from "@/app/_providers/render";

export default function NotCountStatusBtn() {
  const renderCtx = useRenderCtx();
  const [isAllHoldStepupPOpen, setIsAllHoldStepupPOpen] = useState(false);
  const [requestId, setRequestId] = useState<string>();

  const handleShowAllHoldStepup = () => {
    setIsAllHoldStepupPOpen(true);
  };

  const onCloseAllHoldStepupP = () => {
    setIsAllHoldStepupPOpen(false);
  };

  useEffect(() => {
    if (!renderCtx?.isReadMode) {
      setRequestId(renderCtx?.userId)
    } else {
      setRequestId(renderCtx.requestId)
    }
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-3">
        <CommonButton
          label={"전체보기"}
          size={"sm"}
          radius={"sm"}
          color={"primary"}
          variant={"bordered"}
          onClick={handleShowAllHoldStepup}
          className="border"
        />
      </div>
      <CommonModal
        title={"전체 스텝업 보류 내역"}
        contents={<AllHoldStepupP requestId={requestId ?? ''} />}
        size={"2xl"}
        isOpen={isAllHoldStepupPOpen}
        onClose={onCloseAllHoldStepupP}
        useCustomBtn={true}
        customButton={
          <>
            <div>
              <CommonButton
                label={"확인"}
                color={"primary"}
                variant={"solid"}
                onClick={onCloseAllHoldStepupP}
              />
            </div>
          </>
        }
      />
    </div>
  );
}
