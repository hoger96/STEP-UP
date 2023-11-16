import { CommonDatePicker } from '@/app/components/DatePicker'
import { Radio, RadioGroup } from '@nextui-org/react'
import React, { useState } from 'react'

export default function UseMileageP(){

  const [approvalReqDt, setApprovalReqDt] = useState(new Date())
  const [approvalReqType, setApprovalReqType] = useState<string>('EARLY_OFF')

  return (
    <div>
        <div>
            <CommonDatePicker 
              name="신청일자"
              selected={approvalReqDt}
              onChange={(selectedDate: Date) => setApprovalReqDt(selectedDate)}
            />
        </div>
        <div>
        <RadioGroup
            value={approvalReqType}
            onValueChange={setApprovalReqType}
            label="신청 타입"
            orientation="horizontal"
            defaultValue="EARLY_OFF">
            <Radio value="EARLY_OFF">조기퇴근</Radio>
            <Radio value="MORNING_HALF_DAY_OFF">오전반차</Radio>
            <Radio value="AFTERNOON_HALF_DAY_OFF">오후반차</Radio>
            <Radio value="DAY_OFF">연차</Radio>
         </RadioGroup>
        </div>
    </div>
  )
}
