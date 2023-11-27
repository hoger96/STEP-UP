"use client";

import CommonButton from "@/app/components/Buttons";
import CommonModal from "@/app/components/Confirm";
import React, { useState } from "react";
import AllHoldStepupP from "../popup/AllHoldStepupP";

interface IProps {
  requestId: string;
}

export default function NotCountStatusBtn(props: IProps) {
  const [isAllHoldStepupPOpen, setIsAllHoldStepupPOpen] = useState(false);

  const handleShowAllHoldStepup = () => {
    setIsAllHoldStepupPOpen(true);
  };

  const onCloseAllHoldStepupP = () => {
    setIsAllHoldStepupPOpen(false);
  };

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
        contents={<AllHoldStepupP requestId={props.requestId} />}
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
