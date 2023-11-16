'use client'

import CommonButton from '@/app/components/Buttons'
import CommonModal from '@/app/components/Confirm'
import React, { useState } from 'react'
import CreateTodayStepupP from '../popup/CreateTodayStepupP'
import axios from 'axios'

interface ICreateTodayStepupParams {
  stepUpCreateDto: {
    startTm: string
    endTm: string
    userId: string
  }
  file: string[]
}

export default function TodayStepupBtn(){

  const [isOpen , setIsOpen] = useState(false)
  const [todayDate, setTodayDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTm, setStartTm] = useState<string>('');
  const [endTm, setEndTm] = useState<string>('');
  const [file, setFile] = useState<any>('');

    const handelOpenCreateTodayStepupPopup = () => {
        console.log('handelOpenCreateTodayStepupPopup')
        setIsOpen(true)
    }
    
    const setParams = (startTm: string, endTm: string, userId: string, file: any) => {
        const formData = new FormData()

        formData.append('startTm',startTm)
        formData.append('endTm', endTm)
        formData.append('userId', userId)
        formData.append('file', new Blob(file))
      
        
        return formData
    }

    const createTodayStepup = async(formData: any) => {
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
      setStartTm('')
      setEndTm('')
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


