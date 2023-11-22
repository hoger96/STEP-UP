"use client"

import CommonButton from '@/app/components/Buttons'
import CommonTable from '@/app/components/Table'
import { Chip, ChipProps, Tooltip } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface IProps {
  shouldRefreshTable: boolean
  requestId: string
}

interface IRows {
  approvalId: string
  approvalReqDt: string
  approvalReqType: string
  approvalReqTypeNm: string
  approvalStus: string
  approvalStusNm: string
  rowNum: string
}

export default function MileageStatus(props: IProps) {

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

  const userId = sessionStorage.getItem('loginUserId')
  const [rows, setRows] = useState([])
  // type Item = (typeof rows)[0];

  const statusColorMap: Record<string, ChipProps["color"]> = {
    APPROVAL: "success",
    REJECT: "danger",
    WAIT: "warning",
    CANCEL: "secondary"
  };

  const renderCell = React.useCallback((items: IRows, columnKey: string) => {
    const cellValue = items[columnKey as keyof IRows];

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
              userId !== props.requestId ? '내 신청만 취소할 수 있어요!' : items?.approvalStus !== "WAIT" ? "이젠 신청 취소를 할 수 없어요" : "신청을 취소할래요?"
            }
          >
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <CommonButton
                label={"신청 취소"}
                size={"sm"}
                radius={"sm"}
                color={"default"}
                variant={"flat"}
                isDisabled={items?.approvalStus !== "WAIT" || userId !== props.requestId}
                onClick={() => console.log("신청 취소", items["approvalId"])}
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
    if (props.shouldRefreshTable && props.requestId) {
      InitMileageStatusTable(props.requestId)
    }
  }, [props.shouldRefreshTable])


  useEffect(() => {
    if (!props.requestId) {
      return
    }

    InitMileageStatusTable(props.requestId)
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

