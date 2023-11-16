import { CommonDatePicker } from '@/app/components/DatePicker';
import CommonInput from '@/app/components/Input'
import { CommonTimePicker } from '@/app/components/TimePicker';
import React, { useCallback, useState } from 'react'
import { CalendarContainer } from 'react-datepicker';
import { useDropzone } from 'react-dropzone';

interface ICreateTodayStepupProps {
    todayDate: string;
    startTm: string | undefined;
    endTm: string | undefined;
    file: any; // Adjust the type based on your requirements
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
      (acceptedFiles: File[]) => {
        setFile(acceptedFiles);
      },
      [setFile]
    );
  

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop });
    const [time, setTime] = useState()
  const files = acceptedFiles.map(file => (
    <li key={file?.path}>
      {`- ${file?.path}`}
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
            {startTm}
        </div>
        <div>
            <CommonTimePicker
              name="종료시간"
              selected={endTm}
              onChange={(selectedTime: any) => setEndTm(selectedTime)}
            />
            {endTm}
        </div>
        <div>
            <div {...getRootProps({className: 'dropzone'})}>
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

export default CreateTodayStepupP;
