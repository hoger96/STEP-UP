"use client"

import CommonTable from '@/app/components/Table'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface ITotalStepupData {
  rowNum: number
  achievementDt: string
}

export default function TotalStepup(){

const columns = [
  {
    key: 'rowNum',
    label: '회차'
  },
  {
    key: 'achievementDt',
    label: '스텝업 달성일'
  }
]
const [rows , setRows] = useState<ITotalStepupData[]>([])

const getTotalStepupData = async(userId: string) => {
  try {
    const result = await axios.get('/stepup/api/user/list/exercise', {
      params: {
        userId
      }
    })
    return result.data.body

  } catch (e) {
    console.error(e)
  }
}

const initTotalSetupTable = async() => {
  const result = await getTotalStepupData('kyuleelim')
  if(result){
    setRows(result)
  }
}

useEffect(() => {
  initTotalSetupTable()
}, [])

  return (
    <div>
       <CommonTable 
        emptyContent={'조회된 데이터가 없습니다.'}
        tablekey={'total-step-table'}
        columns={columns}
        rows={rows} 
        uniqueKey={'rowNum'} 
        total={0} 
        page={0}        
      />
    </div>
  )
}

