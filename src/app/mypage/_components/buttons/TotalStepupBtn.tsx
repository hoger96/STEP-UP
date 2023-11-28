"use client";

import CommonButton from "@/app/components/Buttons";
import CommonModal from "@/app/components/Confirm";
import React, { useState } from "react";
import AllTotalStepupP from "../popup/AllTotalStepupP";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useRenderCtx } from "@/app/_providers/render";

interface IProps {
  requestId: string;
  onRefreshTable: () => void;
}

export default function TotalStepupBtn(props: IProps) {
  const [isConfirmOpen, setIsConfrimOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const renderCtx = useRenderCtx();

  const changeToMileage = async (userId: string) => {
    try {
      await axios.put(`/stepup/api/user/conversion/mileage/${userId}`);

      return true;
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e?.response?.data.message);
      }
      return false;
    }
  };

  const handleChaneMileageBtnClick = () => {
    setIsConfrimOpen(true);
  };

  const handleChangeMileage = async () => {
    if (!renderCtx?.userId) {
      router.push("/login");
      return;
    }

    const isSuccess = await changeToMileage(renderCtx.userId);

    if (isSuccess) {
      setIsConfrimOpen(false);
      props.onRefreshTable();
      if (renderCtx) {
        await renderCtx.fetchSession(renderCtx?.userId);
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

  return (
    <div className="flex justify-end mb-3">
      <CommonButton
        label={"마일리지로 변환하기"}
        size={"sm"}
        radius={"sm"}
        color={"primary"}
        variant={"solid"}
        isDisabled={renderCtx?.userId !== props.requestId}
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
            contents={<AllTotalStepupP requestId={props.requestId} />}
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
