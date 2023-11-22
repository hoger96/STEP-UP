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
      <Card className="rounded-2xl py-2.5 px-4">
        <CardBody>
          {/* <div>
            <span>STEP-UP</span>
          </div> */}
          <div className="m-auto">
            <div className="flex">
              <div className="inline-flex mr-4">
                <span className="mr-4 text-primary font-semibold">TODAY</span>
                <p>{`${statusData?.todayStepUpCnt ?? 0}/${
                  statusData?.todayStepUpFixCnt ?? 3
                }`}</p>
              </div>
              <div className="inline-flex mr-4">
                <span className="mr-4 text-primary-300 font-bold">TOTAL</span>
                <p>{statusData?.totalStepUpCnt ?? 0}</p>
              </div>
              <div className="inline-flex mr-4">
                <span className="mr-4 text-primary-100 font-semibold">
                  MILEAGE
                </span>
                <p>{statusData?.mileageCnt ?? 0}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
