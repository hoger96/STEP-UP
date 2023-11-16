import CommonTable from '@/app/components/Table'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface ITotalStepupData {
    rowNum: number
    achievementDt: string
}

  
export default function AllTotalStepupP() {

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

      const [currentPage , setCurrentPage] = useState(1)
      const [rows , setRows] = useState<ITotalStepupData[]>([])

      const getAllTotalStepupData = async(userId: string, currentPage: number) => {
        try {
          const result = await axios.get('/stepup/api/user/entire-list/exercise', {
            params: {
              userId,
              currentPage,
              limit: 10
            }
          })

          return result.data.body
      
        } catch (e) {
          console.error(e)
        }
      }
      
      const initTotalSetupTable = async() => {
        const result = await getAllTotalStepupData('kyuleelim', currentPage)
        if(result){
          setRows(result.data)
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
