"use client"

import CommonButton from '@/app/components/Buttons'
import CommonTable from '@/app/components/Table'
import { Chip, ChipProps, Tooltip } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function MileageStatus({ shouldRefreshTable }) {

  const columns = [
    {
      key: 'rowNum',
      label: '번호'
    },
    {
      key: 'approvalReqDt',
      label: '신청 일자'
    },
    {
      key: 'approvalReqTypeNm',
      label: '신청 타입'
    },
    {
      key: 'approvalStusNm',
      label: '결재 상태'
    },
    {
      key: 'action',
      label: ''
    },
  ]

  const userId = sessionStorage.getItem('userId')
  const [rows, setRows] = useState([])
  type Item = (typeof rows)[0];

  const statusColorMap: Record<string, ChipProps["color"]> = {
    APPROVAL: "success",
    REJECT: "danger",
    WAIT: "warning",
  };

  const renderCell = React.useCallback((items: Item, columnKey: string) => {
    const cellValue = items[columnKey as keyof Item];

    switch (columnKey) {
      case "confirmType":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[items.approvalStus]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "action":
        return (
          <Tooltip
            color="danger"
            content={
              items?.approvalStus !== "WAIT" ? "대기 상태의 신청 건에 한하여 취소가 가능합니다" : "신청 취소하기"
            }
          >
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <CommonButton
                label={"신청 취소"}
                size={"sm"}
                radius={"sm"}
                color={"default"}
                variant={"flat"}
                isDisabled={items?.approvalStus !== "WAIT"}
                onClick={() => console.log("신청 취소", items["id"])}
              />
            </span>
          </Tooltip>
        );
      default:
        return cellValue;
    }
  }, []);

  const getMileageStatusData = async (userId: string) => {
    try {
      const result = await axios.get('/stepup/api/user/list/mileage', {
        params: {
          userId
        }
      })

      return result.data.body
    } catch (e) {
      console.error(e)
    }
  }

  const InitMileageStatusTable = async (userId: string) => {
    if (!userId) {
      return
    }

    const result = await getMileageStatusData(userId)
    setRows(result)
  }

  useEffect(() => {
    if (shouldRefreshTable && userId) {
      InitMileageStatusTable(userId)
    }
  }, [shouldRefreshTable])


  useEffect(() => {
    if (!userId) {
      return
    }

    InitMileageStatusTable(userId)
  }, [])


  return (
    <div>
      <CommonTable
        emptyContent={'조회된 데이터가 없습니다.'}
        tablekey={'mileage-status-table'}
        useRenderCell={true}
        renderCell={renderCell}
        columns={columns}
        rows={rows}
        uniqueKey={'rowNum'}
        total={0}
      />
    </div>
  )
}

