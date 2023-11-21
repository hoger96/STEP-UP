'use client'

import CommonInput from '@/app/components/Input'
import { CommonTimePicker } from '@/app/components/TimePicker';
import React, { useCallback } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone';

interface ICreateTodayStepupProps {
  todayDate: string;
  startTm: string | Date | undefined;
  endTm: string | Date | undefined;
  file: FileWithPath[];
  setTodayDate: React.Dispatch<React.SetStateAction<string>>;
  setStartTm: React.Dispatch<React.SetStateAction<string | undefined>>;
  setEndTm: React.Dispatch<React.SetStateAction<string | undefined>>;
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
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop });

  // const removeFile = (fileToRemove: FileWithPath) => () => {
  //   setFile((prevFiles: FileWithPath[]) =>
  //     prevFiles.filter((prevFile) => {
  //       console.log('fileToRemove', fileToRemove)
  //     }));
  // };

  const files = acceptedFiles.map(item => (
    <li key={item.path}>
      {`- ${item.path}`}
      {/* <button onClick={removeFile(item)}>삭제</button> */}
    </li>
  ));

  return (
    <div>
      <div>
        <CommonInput
          value={todayDate}
          label={'일자'}
          isReadOnly={true}
          onValueChange={setTodayDate}
        />
      </div>
      <div>
        <CommonTimePicker
          name="시작시간"
          selected={startTm}
          onChange={(selectedTime: any) => setStartTm(selectedTime)}
        />
      </div>
      <div>
        <CommonTimePicker
          name="종료시간"
          selected={endTm}
          onChange={(selectedTime: any) => setEndTm(selectedTime)}
        />
      </div>
      <div>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>파일선택</p>
        </div>
        <aside>
          <ul>{files}</ul>
        </aside>
      </div>
    </div>
  )
}

export default CreateTodayStepupP