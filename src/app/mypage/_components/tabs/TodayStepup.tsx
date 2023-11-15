"use client"

import CommonButton from '@/app/components/Buttons'
import CommonTable from '@/app/components/Table'
import React, { useState } from 'react'

export default function TodayStepup(){
  const columns = [
    {
      key: 'rowNum',
      label: '회차'
    },
    {
      key: 'startTime',
      label: '시작시간'
    },
    {
      key: 'endTime',
      label: '종료시간'
    },
  ]
  const [rows , setRows] = useState([])
  
  // const getTotalStepupData = async() => {
  //   try {
  //     const result = await(await fetch('/stepup/api/management/approval')).json()
  //     console.log('result', result.data)
  
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }
  
  // useEffect(() => {
  
  // })
  
    return (
      <div>
        {/* <div>
          <CommonButton 
            label={'오늘의 운동 기록하기'} 
            size={'sm'} 
            radius={'none'} 
            color={'primary'} 
            variant={'shadow'} 
            onClick={undefined} 
          />
        </div> */}
         <CommonTable 
          emptyContent={'조회된 데이터가 없습니다.'} 
          tablekey={'today-step-table'} 
          columns={columns} 
          rows={rows} 
          />
      </div>
    )
}

