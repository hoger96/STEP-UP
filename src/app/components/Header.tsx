"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CommonButton from "./Buttons";
import axios from "axios";
import CommonModal from "./Confirm";
import HoldPopup from "./HoldPopup";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/react";

export default function Header() {
  const [openSignal, setOpenSignal] = useState(false);
  const [loginUserId, setLoginUserId] = useState<string | null>(null);
  const [loginUserName, setLoginUserName] = useState<string | null>(null);
  const [loginUserMaster, setLoginUserMaster] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [reason, setReason] = useState<string>("");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/stepup/api/logout");
      sessionStorage.removeItem("loginUserId");
      sessionStorage.removeItem("loginUserName");
      sessionStorage.removeItem("loginUserMaster");
      sessionStorage.removeItem("holdYn");
      setLoginUserId(null);
      setLoginUserName(null);
      setLoginUserMaster(null);
      router.push("/login");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenHoldPopup = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setReason("");
    setOpenSignal(true);
  };

  const holdValidation = () => {
    let isValid = true;
    if (!startDate) {
      toast.error("보류 시작일을 선택해주세요.");
      isValid = false;
      return;
    }
    if (!endDate) {
      toast.error("보류 종료일을 선택해주세요.");
      isValid = false;
      return;
    }
    if (!reason) {
      toast.error("보류 사유를 입력해주세요.");
      isValid = false;
      return;
    }
    return isValid;
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleConfirm = async () => {
    try {
      const isValid = holdValidation();
      if (isValid) {
        if (startDate && endDate) {
          const params = {
            holdStartDt: formatDate(startDate),
            holdEndDt: formatDate(endDate),
            holdCntn: reason,
            userId: loginUserId,
          };
          await axios.post("/stepup/api/user/hold/exercise", params);
          setOpenSignal(false);
          toast.success("보류 등록을 완료했습니다.");
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("보류 등록을 실패했습니다.");
    }
  };

  useEffect(() => {
    const savedLoginUserId = sessionStorage.getItem("loginUserId");
    const savedLoginUserName = sessionStorage.getItem("loginUserName");
    const savedLoginUserMaster = sessionStorage.getItem("loginUserMaster");

    if (savedLoginUserId && savedLoginUserName && savedLoginUserMaster) {
      setLoginUserId(savedLoginUserId);
      setLoginUserName(savedLoginUserName);
      setLoginUserMaster(savedLoginUserMaster);
    }
  }, []);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      {loginUserId && (
        <div className="py-3 px-5 flex justify-between items-center border-b">
          <h1>
            <Image
              src="/icons/logo.svg"
              width="130"
              height="25"
              alt="step-up logo"
            />
          </h1>

          <nav>
            <Link
              href={`/mypage/${loginUserId}`}
              className="px-3 py-1 mx-3 cursor-pointer text-black-2 font-semibold hover:text-primary-4"
            >
              나의 현황
            </Link>
            {loginUserMaster === "Y" && (
              <Link
                href="/confirm"
                className="px-3 py-1 mx-3 cursor-pointer text-black-2 font-semibold hover:text-primary-4"
              >
                결재 현황
              </Link>
            )}
            <Link
              href="/example"
              className="px-3 py-1 mx-3 cursor-pointer text-black-2 font-semibold hover:text-primary-4"
            >
              공통 컴포넌트 보러가기
            </Link>
          </nav>
          <div className="flex-center-ver">
            <div className="flex-center border rounded-full px-3 py-1">
              <span className="mr-1 text-default-300 text-sm font-medium">
                {loginUserName}
              </span>
              <Image src="/icons/user.svg" width="10" height="10" alt="" />
            </div>
            <Tooltip
              color="default"
              content={"스텝업 보류하기"}
              classNames={{ base: "border-primary" }}
            >
              <div className="inline-block text-danger cursor-pointer">
                <CommonButton
                  size="sm"
                  color="primary"
                  variant="light"
                  isIconOnly
                  className="ml-2 font-semibold"
                  onClick={handleOpenHoldPopup}
                >
                  <Image
                    src="/icons/setting.svg"
                    width="18"
                    height="18"
                    alt="logout"
                  />
                </CommonButton>
              </div>
            </Tooltip>
            <CommonButton
              size="sm"
              color="secondary"
              variant="light"
              isIconOnly
              className="ml-1"
              onClick={handleLogout}
            >
              <Image
                src="/icons/logout.svg"
                width="18"
                height="18"
                alt="logout"
              />
            </CommonButton>
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
        </div>
      )}
    </div>
  );
}
