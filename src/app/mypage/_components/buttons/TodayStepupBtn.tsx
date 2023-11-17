'use client'

import CommonButton from '@/app/components/Buttons'
import CommonModal from '@/app/components/Confirm'
import React, { useState } from 'react'
import CreateTodayStepupP from '../popup/CreateTodayStepupP'
import axios from 'axios'

interface ICreateTodayStepupParams {
  startTm: string
  endTm: string
  userId: string
  file: any[]
}

export default function TodayStepupBtn(){

  const [isOpen , setIsOpen] = useState(false)
  const [todayDate, setTodayDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTm, setStartTm] = useState<Date>(new Date());
  const [endTm, setEndTm] = useState<Date>(new Date());
  const [file, setFile] = useState<any>('');

    const handelOpenCreateTodayStepupPopup = () => {
        setIsOpen(true)
    }
    
    const setParams = (startTm: Date, endTm: Date, userId: string, file: any) => {
        const formData = new FormData()

        const options = { hour: "numeric", minute: "numeric", hour12: false }

        const startTime = new Date(startTm).toLocaleTimeString("ko-KR", options)
        const endTime = new Date(endTm).toLocaleTimeString("ko-KR", options)

        formData.append('startTm', startTime)
        formData.append('endTm', endTime)
        formData.append('userId', userId)
        formData.append('file',new Blob(file))
      
        
        return formData
    }

    const createTodayStepup = async(formData: ICreateTodayStepupParams) => {
      try {
        await axios.post('/stepup/api/user/today-exercise', formData,  {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
      } catch (e) {
        console.error(e)
      }
    }

    const onConfirmBtn = () => {
      const params = setParams(startTm, endTm, 'kyuleelim', file)
      if(params){
        createTodayStepup(params)
      }
    };

    const onClose = () => {
      setStartTm(new Date())
      setEndTm(new Date())
      setIsOpen(false) 
    }

  return (
    <div>
      <CommonButton 
        label={'오늘의 스텝업 기록하기'} 
        size={'sm'} 
        radius={'sm'} 
        color={'default'} 
        variant={'flat'} 
        onClick={handelOpenCreateTodayStepupPopup} 
    />
    <div>
      <CommonModal 
        title={'오늘의 스텝업 기록하기'} 
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
        />} 
        size={'2xl'} 
        isOpen={isOpen} 
        onConfirmBtn={onConfirmBtn} 
        onClose={onClose} 
      />
    </div>
  </div>
)
}


