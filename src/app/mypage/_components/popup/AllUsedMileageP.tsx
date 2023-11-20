import CommonTable from '@/app/components/Table'
import React, { useEffect, useState } from 'react'

interface ITotalStepupData {
  rowNum: number
  achievementDt: string
}


export default function AllUsedMileageP() {

  const columns = [
    {
      key: 'rowNum',
      label: '번호'
    },
    {
      key: 'regDate',
      label: '신청 일자'
    },
    {
      key: 'regType',
      label: '신청 타입'
    }
  ]
  const [rows, setRows] = useState<ITotalStepupData[]>([])

  // const [currentPage , setCurrentPage] = useState(1)

  // const getAllUsedMileageData = async(userId: string, currentPage: number) => {
  //   try {
  //     const result = await axios.get('/stepup/api/user/entire-list/exercise', {
  //       params: {
  //         userId,
  //         currentPage,
  //         limit: 10
  //       }
  //     })

  //     return result.data.body

  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  // const initTotalSetupTable = async() => {
  //   const result = await getAllUsedMileageData('kyuleelim', currentPage)
  //   if(result){
  //     setRows(result.data)
  //   }
  // }

  // useEffect(() => {
  //   initTotalSetupTable()
  // }, [])

  return (
    <div>
      <CommonTable
        emptyContent={'조회된 데이터가 없습니다.'}
        tablekey={'all-mileage-table'}
        columns={columns}
        rows={rows}
        uniqueKey={'rowNum'}
        total={0}
      />
    </div>
  )
}
