"use client"

import CommonButton from '@/app/components/Buttons'
import CommonTable from '@/app/components/Table'
import React, { useState } from 'react'

export default function NotCountStatus(){
  const columns = [
    {
      key: 'rowNum',
      label: '번호'
    },
    {
      key: 'stopStartDate',
      label: '보류 시작일'
    },
    {
      key: 'stopEndDate',
      label: '보류 종료일'
    },
    {
      key: 'stopResult',
      label: '보류 사유'
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
         <CommonTable 
          emptyContent={'조회된 데이터가 없습니다.'} 
          tablekey={'not-count-status-table'} 
          columns={columns} 
          rows={rows} 
          />
      </div>
    )
}

