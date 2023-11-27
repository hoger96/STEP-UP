"use client"

import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import React, { ReactNode, useState } from 'react'
import TodayStepup from './tabs/TodayStepup';
import TotalStepup from './tabs/TotalStepup';
import MileageStatus from './tabs/MileageStatus';
import NotCountStatus from './tabs/NotCountStatus';
import TodayStepupBtn from './buttons/TodayStepupBtn';
import TotalStepupBtn from './buttons/TotalStepupBtn';
import MileageStatusBtn from './buttons/MileageStatusBtn';
import NotCountStatusBtn from './buttons/NotCountStatusBtn';

interface IProps {
  requestId: string
}

export default function StepupTab(props: IProps) {
  const [refreshTodayStepupTable, setRefreshTodayStepupTable] = useState(false);
  const [refreshTotalStepupTable, setRefreshTotalStepupTable] = useState(false);
  const [refreshMileageStatusTable, setRefreshMileageStatusTable] = useState(false);

  const handleRefreshTodayStepupTable = () => {
    setRefreshTodayStepupTable((prev) => !prev);
  };

  const handleRefreshTotalStepupTable = () => {
    setRefreshTotalStepupTable((prev) => !prev);
  };

  const handleRefreshMileageStatusTable = () => {
    setRefreshMileageStatusTable((prev) => !prev);
  };


  let tabs = [
    {
      id: "todayStepup",
      label: "오늘의 스텝업",
      content: <TodayStepup shouldRefreshTable={refreshTodayStepupTable} requestId={props.requestId} />,
      btnContent: <TodayStepupBtn onRefreshTable={handleRefreshTodayStepupTable} requestId={props.requestId} />
    },
    {
      id: "totalStepup",
      label: "연속 스텝업",
      content: <TotalStepup shouldRefreshTable={refreshTotalStepupTable} requestId={props.requestId} />,
      btnContent: <TotalStepupBtn onRefreshTable={handleRefreshTotalStepupTable} requestId={props.requestId} />
    },
    {
      id: "mileageStatus",
      label: "마일리지 사용현황",
      content: <MileageStatus shouldRefreshTable={refreshMileageStatusTable} requestId={props.requestId} />,
      btnContent: <MileageStatusBtn onRefreshTable={handleRefreshMileageStatusTable} requestId={props.requestId} />
    },
    {
      id: "notCountStatus",
      label: "스텝업 보류내역",
      content: <NotCountStatus requestId={props.requestId} />,
      btnContent: <NotCountStatusBtn requestId={props.requestId} />
    }
  ];

  return (
    <div>
      <div className="flex m-auto my-8 max-w-[1500px] flex-col">
        <Tabs aria-label="step-up-tab" items={tabs}>
          {(item: { id: string, label: string, btnContent: ReactNode, content: ReactNode }) => (
            <Tab key={item.id} title={item.label}>
              <Card>
                <CardBody>
                  <div>
                    {item.btnContent}
                  </div>
                  <div>
                    {item.content}
                  </div>
                </CardBody>
              </Card>
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  )
}

