import { CommonDatePicker } from "@/app/components/DatePicker";
import { Radio, RadioGroup } from "@nextui-org/react";
import React from "react";

export default function UseMileageP(props: {
  approvalReqDt: Date | null | undefined;
  approvalReqType: string | undefined;
  setApprovalReqDt: (arg0: Date) => void;
  setApprovalReqType: ((value: string) => void) | undefined;
}) {
  return (
    <div>
      <div>
        <CommonDatePicker
          name="마일리지 사용 일자"
          minDate={new Date()}
          selected={props.approvalReqDt}
          onChange={(selectedDate: Date) =>
            props.setApprovalReqDt(selectedDate)
          }
        />
      </div>
      <div>
        <RadioGroup
          value={props.approvalReqType}
          onValueChange={props.setApprovalReqType}
          label="신청 타입"
          orientation="horizontal"
          defaultValue="EARLY_OFF"
        >
          <Radio value="EARLY_OFF">조기퇴근</Radio>
          <Radio value="MORNING_HALF_DAY_OFF">오전반차</Radio>
          <Radio value="AFTERNOON_HALF_DAY_OFF">오후반차</Radio>
          <Radio value="DAY_OFF">연차</Radio>
        </RadioGroup>
      </div>
    </div>
  );
}
