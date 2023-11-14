"use client"

import CommonTable from '@/app/components/Table'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function TotalStepup(){

const [columns , setColumns] = useState([])
const [rows , setRows] = useState([])

// const getTotalStepupData = async() => {
//   try {
//     const result = await(await fetch('/stepup/api/management/approval')).json()
//     console.log('result', result.data)

//   } catch (e) {
//     console.error(e)
//   }
// }

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

