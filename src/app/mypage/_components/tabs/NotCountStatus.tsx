"use client"

import CommonButton from '@/app/components/Buttons'
import CommonTable from '@/app/components/Table'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface IHoldStepupData {
  rowNum: number
  holdStartDt: string
  holdEndDt: string
  holdCntn: string
}

export default function NotCountStatus(){
  const columns = [
    {
      key: 'rowNum',
      label: '번호'
    },
    {
      key: 'holdStartDt',
      label: '보류 시작일'
    },
    {
      key: 'holdEndDt',
      label: '보류 종료일'
    },
    { 
      key: 'holdCntn',
      label: '보류 사유'
    },
  ]
  const [rows , setRows] = useState<IHoldStepupData[]>([])
  
  const getHoldStepupData = async(userId: string) => {
    try {
      const result = await axios.get('/stepup/api/user/list/hold-exercise', {
        params: {
          userId
        }
      })
      return result.data.body
    } catch (e) {
      console.error(e)
    }
  }
  
  const InitHoldStepupTable = async() => {
    const result = await getHoldStepupData('kyuleelim')
    if(result){
      setRows(result)
    }
  }

  useEffect(() => {
    InitHoldStepupTable()
  }, [])
  
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
          tablekey={'hold-step-table'}
          columns={columns}
          rows={rows} 
          uniqueKey={'rowNum'} 
          total={0} 
          page={0}          
        />
      </div>
    )
}


