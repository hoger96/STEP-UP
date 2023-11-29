"use client";

import CommonButton from "@/app/components/Buttons";
import CommonModal from "@/app/components/Confirm";
import React, { useEffect, useState } from "react";
import AllTotalStepupP from "../popup/AllTotalStepupP";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRenderCtx } from "@/app/_providers/render";

export default function TotalStepupBtn() {
  const [isConfirmOpen, setIsConfrimOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [requestId, setRequestId] = useState<string>()
  const renderCtx = useRenderCtx();

  const changeToMileage = async (userId: string) => {
    try {
      await axios.put(`/stepup/api/user/conversion/mileage/${userId}`);

      return true;
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e?.response?.data.message);
      }
      setIsConfrimOpen(false)
      return false;
    }
  };

  const handleChaneMileageBtnClick = () => {
    setIsConfrimOpen(true);
  };

  // 마일리지로 변환하기
  const handleChangeMileage = async () => {
    const isSuccess = await changeToMileage(renderCtx?.userId); // 본인만 가능

    if (isSuccess) {
      setIsConfrimOpen(false);
      if (renderCtx) {
        await renderCtx.fetchUserCurrentStatus(renderCtx?.userId);
        await renderCtx.fetchTotalTable(renderCtx?.userId, 1);
      }
      toast.success("1개의 마일리지가 생성되었어요!");
    }
  };

  const handleShowAllTotalStepup = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!renderCtx?.isReadMode) {
      setRequestId(renderCtx?.userId)
    } else {
      setRequestId(renderCtx.requestId)
    }
  }, []);


  return (
    <div className="flex justify-end mb-3">
      <CommonButton
        label={"마일리지로 변환하기"}
        size={"sm"}
        radius={"sm"}
        color={"primary"}
        variant={"solid"}
        isDisabled={renderCtx?.isReadMode}
        onClick={handleChaneMileageBtnClick}
      />
      <CommonButton
        label={"전체보기"}
        size={"sm"}
        radius={"sm"}
        color={"primary"}
        variant={"bordered"}
        onClick={handleShowAllTotalStepup}
        className="ml-1 border"
      />
      <div>
        <div>
          <CommonModal
            title={"전체 스텝업"}
            contents={<AllTotalStepupP requestId={requestId ?? ''} />}
            size={"2xl"}
            isOpen={isOpen}
            onClose={onClose}
            useCustomBtn={true}
            customButton={
              <>
                <div>
                  <CommonButton
                    label={"확인"}
                    color={"primary"}
                    variant={"solid"}
                    onClick={onClose}
                  />
                </div>
              </>
            }
          />
        </div>
      </div>
      <CommonModal
        title={"확인"}
        contents={"마일리지로 변환하시겠습니까?"}
        isOpen={isConfirmOpen}
        size={"sm"}
        onClose={() => {
          setIsConfrimOpen(false);
        }}
        onConfirmBtn={handleChangeMileage}
      />
    </div>
  );
}
