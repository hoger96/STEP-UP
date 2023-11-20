'use client'

import CommonButton from '@/app/components/Buttons'
import CommonModal from '@/app/components/Confirm'
import React, { useState } from 'react'
import AllHoldStepupP from '../popup/AllHoldStepupP'

export default function NotCountStatusBtn() {
  const [isAllHoldStepupPOpen, setIsAllHoldStepupPOpen] = useState(false)

  const handleShowAllHoldStepup = () => {
    setIsAllHoldStepupPOpen(true)
  }

  const onCloseAllHoldStepupP = () => {
    setIsAllHoldStepupPOpen(false)
  }

  return (
    <div>
      <CommonButton
        label={'전체보기'}
        size={'sm'}
        radius={'sm'}
        color={'default'}
        variant={'flat'}
        onClick={handleShowAllHoldStepup}
      />
      <CommonModal
        title={'전체 스텝업 보류 내역'}
        contents={<AllHoldStepupP />}
        size={'2xl'}
        isOpen={isAllHoldStepupPOpen}
        onClose={onCloseAllHoldStepupP}
        useCustomBtn={true}
        customButton={
          <>
            <div>
              <CommonButton
                label={'확인'}
                color={'default'}
                variant={'flat'}
                onClick={onCloseAllHoldStepupP}
              />
            </div>
          </>
        }
      />
    </div>
  )
}

