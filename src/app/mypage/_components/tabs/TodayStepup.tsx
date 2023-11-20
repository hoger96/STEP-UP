"use client"

import CommonTable from '@/app/components/Table'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface ITodayStepupData {
  rowNum: number
  startTm: string
  endTm: string
}

export default function TodayStepup({ shouldRefreshTable }) {
  const columns = [
    {
      key: 'rowNum',
      label: '회차'
    },
    {
      key: 'startTm',
      label: '시작시간'
    },
    {
      key: 'endTm',
      label: '종료시간'
    },
  ]
  const [rows, setRows] = useState<ITodayStepupData[]>([])

  const getTodayStepupData = async (userId: string) => {
    try {
      const result = await axios.get('/stepup/api/user/list/today-exercise', {
        params: {
          userId
        }
      })
      return result.data.body
    } catch (e) {
      console.error(e)
    }
  }

  const InitTodayStepupTable = async () => {
    const result = await getTodayStepupData('kyuleelim')
    if (result) {
      setRows(result)
    }
  }

  useEffect(() => {
    if (shouldRefreshTable) {
      InitTodayStepupTable()
    }
  }, [shouldRefreshTable])

  useEffect(() => {
    InitTodayStepupTable()
  }, [])

  return (
    <div>
      <CommonTable
        emptyContent={'조회된 데이터가 없습니다.'}
        tablekey={'today-step-table'}
        columns={columns}
        rows={rows}
        uniqueKey={'rowNum'}
        total={0}
      />
    </div>
  )
}

