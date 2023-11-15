"use client"

import CommonTable from '@/app/components/Table'
import React, { useEffect, useState } from 'react'

export default function TotalStepup(){

const columns = [
  {
    key: 'rowNum',
    label: '회차'
  },
  {
    key: 'successDate',
    label: '스텝업 달성일'
  }
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
        tablekey={'total-step-table'} 
        columns={columns} 
        rows={rows} 
        />
    </div>
  )
}

