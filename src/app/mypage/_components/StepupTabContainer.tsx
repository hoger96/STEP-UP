"use client"

import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import React from 'react'
import TodayStepup from './tabs/TodayStepup';
import TotalStepup from './tabs/TotalStepup';
import MileageStatus from './tabs/MileageStatus';
import NotCountStatus from './tabs/NotCountStatus';
import TodayStepupBtn from './buttons/TodayStepupBtn';
import TotalStepupBtn from './buttons/TotalStepupBtn';
import MileageStatusBtn from './buttons/MileageStatusBtn';
import NotCountStatusBtn from './buttons/NotCountStatusBtn';

export default function StepupTab(){

    let tabs = [
        {
          id: "todayStepup",
          label: "오늘의 스텝업",
          content: <TodayStepup />,
          btnContent: <TodayStepupBtn />
        },
        {
          id: "totalStepup",
          label: "연속 스텝업",
          content: <TotalStepup />,
          btnContent: <TotalStepupBtn />
        },
        {
          id: "mileageStatus",
          label: "마일리지 사용현황",
          content: <MileageStatus />,
          btnContent: <MileageStatusBtn />
        },
        {
          id: "notCountStatus",
          label: "스텝업 보류내역",
          content: <NotCountStatus />,
          btnContent: <NotCountStatusBtn />
        }
      ];
      
  return (
    <div>
      <div className="flex m-auto my-8 max-w-[1500px] flex-col">
        <Tabs aria-label="step-up-tab" items={tabs}>
          {(item) => (
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

