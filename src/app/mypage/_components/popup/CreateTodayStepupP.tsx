"use client";

import CommonInput from "@/app/components/Input";
import { CommonTimePicker } from "@/app/components/TimePicker";
import React, { useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

interface ICreateTodayStepupProps {
  todayDate: string;
  startTm: Date | undefined;
  endTm: Date | undefined;
  file: FileWithPath[];
  setTodayDate: React.Dispatch<React.SetStateAction<string>>;
  setStartTm: (data: Date) => void;
  setEndTm: (data: Date) => void;
  setFile: React.Dispatch<React.SetStateAction<any>>;
}

const CreateTodayStepupP: React.FC<ICreateTodayStepupProps> = ({
  todayDate,
  startTm,
  endTm,
  file,
  setTodayDate,
  setStartTm,
  setEndTm,
  setFile,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
    },
    [setFile]
  );
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
  });

  // const handleRemove = () => {

  //   setFile((prevFiles: any) => {
  //     const newFiles = [...prevFiles];
  //     newFiles.splice(0, 1);
  //     return newFiles;
  //   });
  // };

  // {
  //   const deletedFile = acceptedFiles.forEach((selected, index) => {
  //     if (selected.name === item.name) {
  //       acceptedFiles.splice(index)
  //     }
  //   })
  //   setFile(deletedFile)
  //   console.log('fule', file)
  // }

  const files = acceptedFiles.map((item: FileWithPath) => (
    <li key={item.path} className="flex-center-ver">
      {`- ${item.path}`}
      <button>
        <img src="/icons/close.svg" width="20" height="auto" alt="삭제" />
      </button>
    </li>
  ));

  return (
    <div>
      <CommonInput
        value={todayDate}
        label={"일자"}
        isReadOnly={true}
        onValueChange={setTodayDate}
        className="mb-3"
      />
      <div className="flex-center-ver mb-3">
        <CommonTimePicker
          name="시작/종료 시간"
          selected={startTm}
          onChange={(selectedTime: any) => setStartTm(selectedTime)}
        />
        <span className="inline-block text-small font-semibold mx-2">~</span>
        <CommonTimePicker
          selected={endTm}
          onChange={(selectedTime: any) => setEndTm(selectedTime)}
        />
      </div>
      <div className="flex">
        <p className="inline-block text-small font-semibold pr-2 w-28">
          첨부파일
        </p>
        <div className="flex flex-col flex-1">
          <div
            {...getRootProps({
              className:
                "dropzone py-6 flex-1 rounded-medium border border-dashed border-default-100 text-sm flex-center flex-col bg-dafault-50",
            })}
          >
            <p className="text-default-300">
              파일을 이곳으로 드래그 또는 파일 첨부하기 버튼을 눌러 업로드
              해주세요.
            </p>
            <p className="mb-3 text-default-300">
              * 하나의 파일만 업로드 가능합니다.
            </p>

            <button
              type="button"
              className="border border-default-100 text-default-300 rounded h-8 px-2 text-sm"
            >
              파일 첨부하기
              <input {...getInputProps()} />
            </button>
          </div>

          <ul className="text-sm text-default-300 mt-3">{files}</ul>
        </div>
      </div>
    </div>
  );
};

export default CreateTodayStepupP;
