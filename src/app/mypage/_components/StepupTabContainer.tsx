"use client"

import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import React from 'react'
import TodayStepup from './tabs/TodayStepup';
import TotalStepup from './tabs/TotalStepup';
import MileageStatus from './tabs/MileageStatus';
import NotCountStatus from './tabs/NotCountStatus';
import CommonButton from '@/app/components/Buttons';

export default function StepupTab(){

    let tabs = [
        {
          id: "todayStepup",
          label: "오늘의 스텝업",
          content: <TodayStepup />
        },
        {
          id: "totalStepup",
          label: "연속 스텝업",
          content: <TotalStepup />
        },
        {
          id: "mileageStatus",
          label: "마일리지 사용현황",
          content: <MileageStatus />
        },
        {
            id: "notCountStatus",
            label: "스템업 보류내역",
            content: <NotCountStatus />
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
                  {item.content}
                </CardBody>
              </Card>  
            </Tab>
          )}
        </Tabs>
      </div>  
      </div>  
  )
}

