"use client";
import Link from "next/link";
import React, { useState } from "react";
import CommonButton from "./Buttons";
import axios from "axios";
import CommonModal from "./Confirm";
import HoldPopup from "./HoldPopup";

export default function Header() {
  const [openSignal, setOpenSignal] = useState(false);
  const loginUserId = sessionStorage.getItem("loginUserId");
  const loginUserName = sessionStorage.getItem("loginUserName");
  const loginUserMaster = sessionStorage.getItem("loginUserMaster");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [reason, setReason] = useState<string>("");

  const handleLogout = async () => {
    try {
      await axios.get("/stepup/api/logout");
      sessionStorage.removeItem("loginUserId");
      sessionStorage.removeItem("loginUserName");
      sessionStorage.removeItem("loginUserMaster");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenHoldPopup = () => {
    setOpenSignal(true);
  };

  const handleConfirm = () => {
    if (startDate && endDate) {
      const params = {
        holdStartDt: startDate.toISOString().split("T")[0],
        holdEndDt: endDate.toISOString().split("T")[0],
        holdCntn: reason,
        userId: loginUserId,
      };
    }
  };

  return (
    <div>
      {loginUserId && (
        <div className="p-5 bg-black flex">
          <p className="mr-3 text-white">STEP-UP</p>
          <p className="text-white">|</p>
          <p className="mx-3 text-white">{loginUserName}</p>
          {/* <p>|</p> */}
          <p className="mx-3 cursor-pointer text-white">
            <Link href={`/mypage/${loginUserId}`}>나의 현황</Link>
          </p>
          {/* <p>|</p> */}
          {loginUserMaster === "Y" && (
            <p className="mx-3 cursor-pointer text-white">
              <Link href="/confirm">결재 현황</Link>
            </p>
          )}
          {/* <p>|</p> */}
          <p className="mx-3 cursor-pointer text-white">
            <Link href="/example">공통 컴포넌트 보러가기</Link>
          </p>
          <CommonButton
            label="스텝업 보류하기"
            size="sm"
            color="default"
            variant="solid"
            onClick={handleOpenHoldPopup}
          />
          <CommonButton
            label="로그아웃"
            size="sm"
            color="default"
            variant="solid"
            onClick={handleLogout}
          />
          <CommonModal
            title={"스텝업 보류하기"}
            contents={
              <HoldPopup
                startDate={startDate}
                endDate={endDate}
                reason={reason}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setReason={setReason}
              />
            }
            isOpen={openSignal}
            size={"lg"}
            onClose={() => {
              setOpenSignal(false);
            }}
            onConfirmBtn={() => {
              handleConfirm();
            }}
          />
        </div>
      )}
    </div>
  );
}
