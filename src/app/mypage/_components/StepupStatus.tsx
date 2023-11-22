"use client";

import { Card, CardBody } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface IStepupStatusData {
  userId: string;
  userNm: string;
  todayStepUpCnt: number;
  todayStepUpFixCnt: number;
  totalStepUpCnt: number;
  mileageCnt: number;
}

interface IProps {
  requestId: string;
}

export default function StepupStatus(props: IProps) {
  // const [userId, setUserId] = useState<string>()
  const [statusData, setStatusData] = useState<IStepupStatusData>();

  const getStepupStatusData = async (userId: string) => {
    try {
      const result = await axios.get("/stepup/api/user", {
        params: {
          userId,
        },
      });
      sessionStorage.setItem("holdYn", result.data.body.holdYn);
      return result.data.body;
    } catch (e) {
      console.error(e);
    }
  };

  const initStepupStatus = async () => {
    if (props.requestId) {
      const result = await getStepupStatusData(props.requestId);
      if (result) {
        setStatusData(result);
      }
    }
  };

  useEffect(() => {
    initStepupStatus();
  }, []);

  return (
    <div>
      <Card className="max-w-[1500px] min-h-[150px] m-auto">
        <CardBody>
          <div>
            <span>STEP-UP</span>
          </div>
          <div className="m-auto">
            <div className="flex">
              <div className="inline-flex mr-4">
                <span className="mr-4 text-green-500">TODAY</span>
                <p>{`${statusData?.todayStepUpCnt ?? 0}/${
                  statusData?.todayStepUpFixCnt ?? 3
                }`}</p>
              </div>
              <div className="inline-flex mr-4">
                <span className="mr-4 text-red-400">TOTAL</span>
                <p>{statusData?.totalStepUpCnt ?? 0}</p>
              </div>
              <div className="inline-flex mr-4">
                <span className="mr-4 text-blue-400">MILEAGE</span>
                <p>{statusData?.mileageCnt ?? 0}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
