import CommonInput from "@/app/components/Input";
import axios from "axios";
import { useEffect, useState } from "react";

interface IConfirmDetail {
  rowNum?: number;
  approvalId: string;
  userNm: string;
  draftDt: string;
  approvalReqDt: string;
  approvalReqType: string;
  approvalReqTypeNm: string;
  approvalStus: string;
  approvalStusNm: string;
}

interface IUserInfo {
  approvalStatus: string;
  userId: string;
}

export default function ConfirmPopup(props: {
  approvalId: string;
  onFetchStatus: (userInfo: IUserInfo) => void;
}) {
  const [data, setData] = useState<IConfirmDetail>();

  const fetchData = async (approvalId: string) => {
    try {
      const result = await axios.get(
        `/stepup/api/management/approval/${approvalId}`
      );
      setData(result.data.body);

      const userInfo = {
        approvalStatus: result.data.body.approvalStus,
        userId: result.data.body.userId,
      };
      props.onFetchStatus(userInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(props.approvalId);
  }, [props.approvalId]);

  return (
    <div>
      <div className="m-3">
        <CommonInput
          value={data ? data.userNm : ""}
          label="사원 명"
          isReadOnly={true}
        />
      </div>
      <div className="m-3">
        <CommonInput
          value={data ? data.draftDt : ""}
          label="결재 신청 일자"
          isReadOnly={true}
        />
      </div>
      <div className="m-3">
        <CommonInput
          value={data ? data.approvalReqDt : ""}
          label="마일리지 사용 일자"
          isReadOnly={true}
        />
      </div>
      <div className="m-3">
        <CommonInput
          value={data ? data.approvalReqTypeNm : ""}
          label="신청 타입"
          isReadOnly={true}
        />
      </div>
    </div>
  );
}
