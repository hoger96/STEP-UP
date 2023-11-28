"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CommonButton from "./Buttons";
import axios from "axios";
import CommonModal from "./Confirm";
import HoldPopup from "./HoldPopup";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/react";
import { useRenderCtx } from "../_providers/render";

export default function Header() {
  const [openSignal, setOpenSignal] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [reason, setReason] = useState<string>("");
  const router = useRouter();
  const renderCtx = useRenderCtx();

  const handleLogout = async () => {
    try {
      await axios.get("/stepup/api/logout");
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
            userId: renderCtx?.userId,
          };
          await axios.post("/stepup/api/user/hold/exercise", params);
          if (renderCtx) {
            await renderCtx.fetchSession(renderCtx.userId);
            await renderCtx.fetchHoldTable(renderCtx.userId);
          }
          setOpenSignal(false);
          toast.success("보류 등록을 완료했습니다.");
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("보류 등록을 실패했습니다.");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="py-3 px-5 flex justify-between items-center border-b">
        <h1>
          <img
            src="/icons/logo.svg"
            width="130"
            height="auto"
            alt="step-up logo"
          />
        </h1>

        <nav>
          <Link
            href={`/mypage/${renderCtx?.userId}`}
            className="px-3 py-1 mx-3 cursor-pointer text-black-2 font-semibold hover:text-primary-4"
          >
            나의 현황
          </Link>
          <Link
            href="/confirm"
            className="px-3 py-1 mx-3 cursor-pointer text-black-2 font-semibold hover:text-primary-4"
          >
            결재 현황
          </Link>
          <Link
            href="/example"
            className="px-3 py-1 mx-3 cursor-pointer text-black-2 font-semibold hover:text-primary-4"
          >
            공통 컴포넌트 보러가기
          </Link>
        </nav>
        <div className="flex items-center">
          <div className="flex-center border rounded-full px-3 py-1">
            <span className="mr-1 text-default-300 text-sm font-medium">
              {renderCtx?.userNm}
            </span>
            <img src="/icons/user.svg" width="10" height="auto" alt="" />
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
                <img
                  src="/icons/setting.svg"
                  width="18"
                  height="auto"
                  alt="logout"
                />
              </CommonButton>
            </div>
          </Tooltip>
          <CommonButton
            size="sm"
            color="primary"
            variant="light"
            isIconOnly
            className="ml-1"
            onClick={handleLogout}
          >
            <img
              src="/icons/logout.svg"
              width="18"
              height="auto"
              alt="logout"
            />
          </CommonButton>
          <CommonModal
            title={"스텝업 보류하기"}
            scrollBehavior={"inside"}
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
        <CommonModal
          title={"스텝업 보류하기"}
          scrollBehavior={"inside"}
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
  );
}
