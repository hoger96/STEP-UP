"use client";

import CommonButton from "@/app/components/Buttons";
import CommonModal from "@/app/components/Confirm";
import React, { useState } from "react";
import UseMileageP from "../popup/UseMileageP";
import AllUsedMileageP from "../popup/AllUsedMileageP";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRenderCtx } from "@/app/_providers/render";

interface IApplyUseMileageParams {
  approvalReqDt: string;
  approvalReqType: string;
  userId: string;
}

interface IProps {
  requestId: string;
}

export default function MileageStatusBtn(props: IProps) {
  // 마일리지 사용 신청 팝업 데이터
  const [approvalReqDt, setApprovalReqDt] = useState(new Date()); // 신청일자
  const [approvalReqType, setApprovalReqType] = useState<string>("EARLY_OFF"); // 신청타입

  const [isUseMileagePOpen, setIsUseMileagePOpen] = useState(false);
  const [isAllUseMileagePOpen, setIsAllUseMileagePOpen] = useState(false);
  const renderCtx = useRenderCtx();

  // 마일리지 사용 신청 팝업
  const handleUseMileage = () => {
    setIsUseMileagePOpen(true);
  };

  const onCloseUseMileageP = () => {
    setIsUseMileagePOpen(false);
    setApprovalReqDt(new Date());
    setApprovalReqType("EARLY_OFF");
  };

  const setParams = (
    approvalReqDt: Date,
    approvalReqType: string,
    userId: string
  ) => {
    return {
      approvalReqDt: new Date(approvalReqDt).toISOString().split("T")[0],
      approvalReqType,
      userId: renderCtx?.userId,
    };
  };

  const applyUseMileage = async (data: IApplyUseMileageParams) => {
    try {
      await axios.post("/stepup/api/user/mileage", data);

      return true;
    } catch (e) {
      return false;
    }
  };

  // 마일리지 사용 신청
  const onConfirmUseMileageP = async () => {
    const params = setParams(approvalReqDt, approvalReqType, renderCtx?.userId); // 본인만 신청 가능
    const isSuccess = await applyUseMileage(params);
    if (isSuccess) {
      setIsUseMileagePOpen(false);
      if (renderCtx) {
        await renderCtx.fetchUserCurrentStatus(renderCtx?.userId);
        await renderCtx.fetchMileageTable(renderCtx?.userId, 1);
      }
      toast.success(`마일리지 사용 신청을 완료했어요 :)`);
    } else {
      toast.error("마일리지가 부족해요!");
    }
  };

  // 전체 마일리지 사용 현황 팝업
  const handleShowAllMileage = () => {
    setIsAllUseMileagePOpen(true);
  };

  const onCloseAllUseMileageP = () => {
    setIsAllUseMileagePOpen(false);
  };

  return (
    <>
      <div className="flex justify-end mb-3">
        <CommonButton
          label={"신청"}
          size={"sm"}
          radius={"sm"}
          color={"primary"}
          variant={"solid"}
          isDisabled={renderCtx?.isReadMode || renderCtx?.mileage <= 0}
          onClick={handleUseMileage}
        />
        <CommonModal
          title={"마일리지 사용 신청"}
          scrollBehavior={"inside"}
          contents={
            <UseMileageP
              approvalReqDt={approvalReqDt}
              approvalReqType={approvalReqType}
              setApprovalReqDt={setApprovalReqDt}
              setApprovalReqType={setApprovalReqType}
            />
          }
          size={"xl"}
          isOpen={isUseMileagePOpen}
          onClose={onCloseUseMileageP}
          onConfirmBtn={onConfirmUseMileageP}
        />
        <CommonButton
          label={"전체보기"}
          size={"sm"}
          radius={"sm"}
          color={"primary"}
          variant={"bordered"}
          onClick={handleShowAllMileage}
          className="ml-2 border"
        />
        <CommonModal
          title={"전체 마일리지 사용 현황"}
          contents={<AllUsedMileageP requestId={props.requestId} />}
          size={"xl"}
          isOpen={isAllUseMileagePOpen}
          onClose={onCloseAllUseMileageP}
          useCustomBtn={true}
          customButton={
            <>
              <div>
                <CommonButton
                  label={"확인"}
                  color={"primary"}
                  variant={"solid"}
                  onClick={onCloseAllUseMileageP}
                />
              </div>
            </>
          }
        />
      </div>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </>
  );
}
