"use client";

import CommonButton from "@/app/components/Buttons";
import CommonModal from "@/app/components/Confirm";
import React, { useEffect, useState } from "react";
import CreateTodayStepupP from "../popup/CreateTodayStepupP";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IProps {
  requestId: string;
  onRefreshTable: () => void;
}

export default function TodayStepupBtn(props: IProps) {
  const userId = sessionStorage.getItem("loginUserId");

  const [isOpen, setIsOpen] = useState(false);
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startTm, setStartTm] = useState<Date>(new Date());
  const [endTm, setEndTm] = useState<Date>(new Date());
  const [file, setFile] = useState<any>("");
  const holdYn = sessionStorage.getItem("holdYn");
  const router = useRouter();

  const handelOpenCreateTodayStepupPopup = () => {
    setIsOpen(true);
  };

  const setParams = async (
    startTm: Date,
    endTm: Date,
    userId: string,
    file: File[]
  ) => {
    const formData = new FormData();

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };

    const startTime = new Date(startTm).toLocaleTimeString("ko-KR", options);
    const endTime = new Date(endTm).toLocaleTimeString("ko-KR", options);

    formData.append("startTm", startTime);
    formData.append("endTm", endTime);
    formData.append("userId", userId);
    if (file[0]) {
      formData.append(
        "file",
        new Blob([await file[0].arrayBuffer()], { type: file[0].type }),
        file[0].name
      );
    }
    return formData;
  };

  const createTodayStepup = async (formData: FormData) => {
    try {
      await axios.post("/stepup/api/user/today-exercise", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return true;
    } catch (e) {
      if (e instanceof AxiosError) {
        //toast.error(e?.response?.data.message);
        return false;
      }
    }
  };

  const onConfirmBtn = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }
    const params = await setParams(startTm, endTm, userId, file);
    if (params) {
      const isSuccess = await createTodayStepup(params);
      if (isSuccess) {
        setIsOpen(false);
        props.onRefreshTable();
        toast.success("축하합니다! 오늘의 운동기록을 기록하셨군요 :)");
      } else {
        toast.error(
          "오늘의 운동기록을 추가하지 못했어요. 파일을 첨부해주세요!"
        );
      }
    }
  };

  const onClose = () => {
    setStartTm(new Date());
    setEndTm(new Date());
    setFile([]);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex justify-end">
        <CommonButton
          label={"오늘의 스텝업 기록하기"}
          size={"sm"}
          radius={"sm"}
          color={"primary"}
          variant={"solid"}
          isDisabled={userId !== props.requestId || holdYn === "Y"}
          onClick={handelOpenCreateTodayStepupPopup}
          className="mb-3"
        />
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
      <div>
        <CommonModal
          title={"오늘의 스텝업 기록하기"}
          scrollBehavior={"inside"}
          contents={
            <CreateTodayStepupP
              todayDate={todayDate}
              startTm={startTm}
              endTm={endTm}
              file={file}
              setTodayDate={setTodayDate}
              setStartTm={setStartTm}
              setEndTm={setEndTm}
              setFile={setFile}
            />
          }
          size={"2xl"}
          isOpen={isOpen}
          onConfirmBtn={onConfirmBtn}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
