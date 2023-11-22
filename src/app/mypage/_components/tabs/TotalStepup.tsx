"use client"

import CommonTable from '@/app/components/Table'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface ITotalStepupData {
  rowNum: number
  achievementDt: string
}

interface IProps {
  shouldRefreshTable: boolean
  requestId: string
}

export default function TotalStepup(props: IProps) {

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

  // const userId = sessionStorage.getItem('loginUserId')
  const [rows, setRows] = useState<ITotalStepupData[]>([])

  const getTotalStepupData = async (userId: string) => {
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

  const initTotalSetupTable = async (userId: string) => {
    if (!userId) {
      return
    }

    const result = await getTotalStepupData(userId)
    if (result) {
      setRows(result)
    }
  }

  useEffect(() => {
    if (props.shouldRefreshTable && props.requestId) {
      initTotalSetupTable(props.requestId)
    }
  }, [props.shouldRefreshTable])


  useEffect(() => {
    if (!props.requestId) {
      return
    }

    initTotalSetupTable(props.requestId)
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
      />
    </div>
  )
}

