"use client";

import CommonButton from "@/app/components/Buttons";
import CommonModal from "@/app/components/Confirm";
import React, { useState } from "react";
import UseMileageP from "../popup/UseMileageP";
import AllUsedMileageP from "../popup/AllUsedMileageP";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IApplyUseMileageParams {
  approvalReqDt: string;
  approvalReqType: string;
  userId: string;
}

interface IProps {
  requestId: string;
  onRefreshTable: () => void;
}

export default function MileageStatusBtn(props: IProps) {
  // const [userId, setUserId] = useState<string>()
  const userId = sessionStorage.getItem("loginUserId");

  // 마일리지 사용 신청 팝업 데이터
  const [approvalReqDt, setApprovalReqDt] = useState(new Date()); // 신청일자
  const [approvalReqType, setApprovalReqType] = useState<string>("EARLY_OFF"); // 신청타입

  const [isUseMileagePOpen, setIsUseMileagePOpen] = useState(false);
  const [isAllUseMileagePOpen, setIsAllUseMileagePOpen] = useState(false);
  const router = useRouter();

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
      userId,
    };
  };

  const applyUseMileage = async (data: IApplyUseMileageParams) => {
    try {
      await axios.post("/stepup/api/user/mileage", data);

      return true;
    } catch (e) {
      // if (e instanceof AxiosError) {
      //     toast.error(e?.response?.data.message)
      // }
      return false;
    }
  };

  const onConfirmUseMileageP = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }

    const params = setParams(approvalReqDt, approvalReqType, userId);
    const isSuccess = await applyUseMileage(params);
    if (isSuccess) {
      setIsUseMileagePOpen(false);
      props.onRefreshTable();
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

  // useEffect(() => {
  //     const savedUserId = sessionStorage.getItem("userId");
  //     if (savedUserId) {
  //         setUserId(savedUserId);
  //     }
  // }, []);

  return (
    <>
      <div className="flex justify-end mb-3">
        <CommonButton
          label={"신청"}
          size={"sm"}
          radius={"sm"}
          color={"primary"}
          variant={"solid"}
          isDisabled={userId !== props.requestId}
          onClick={handleUseMileage}
        />
        <CommonModal
          title={"마일리지 사용 신청"}
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
                  color={"default"}
                  variant={"flat"}
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
