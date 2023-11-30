"use client";

import CommonButton from "@/app/components/Buttons";
import CommonModal from "@/app/components/Confirm";
import React, { useState } from "react";
import CreateTodayStepupP from "../popup/CreateTodayStepupP";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRenderCtx } from "@/app/_providers/render";

export default function TodayStepupBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startTm, setStartTm] = useState<Date>(new Date());
  const [endTm, setEndTm] = useState<Date>(new Date());
  const [file, setFile] = useState<any>("");

  const renderCtx = useRenderCtx();

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

    if (file[0] !== undefined) {
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
        toast.error(e?.response?.data.message);
        return false;
      }
    }
  };

  const onConfirmBtn = async () => {
    const params = await setParams(startTm, endTm, renderCtx?.userId, file);
    if (params) {
      const isSuccess = await createTodayStepup(params);
      if (isSuccess) {
        setIsOpen(false);
        if (renderCtx) {
          await renderCtx.fetchUserCurrentStatus(renderCtx?.userId);
          await renderCtx.fetchTodayStepup(renderCtx?.userId);
        }
        toast.success("축하합니다! 오늘의 운동기록을 기록하셨군요 :)");
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
    <div className="mb-3 flex justify-end">
      <CommonButton
        label={"오늘의 스텝업 기록하기"}
        size={"sm"}
        radius={"sm"}
        color={"primary"}
        variant={"solid"}
        isDisabled={renderCtx?.isReadMode || renderCtx?.holdYn === "Y"}
        onClick={handelOpenCreateTodayStepupPopup}
      />
      <ToastContainer position="top-right" autoClose={2000} />
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
  );
}
