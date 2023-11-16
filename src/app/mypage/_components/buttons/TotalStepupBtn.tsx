'use client'

import CommonButton from '@/app/components/Buttons'
import CommonModal from '@/app/components/Confirm'
import React, { useState } from 'react'
import AllTotalStepupP from '../popup/AllTotalStepupP'

export default function TotalStepupBtn(){

    const [isOpen, setIsOpen] = useState(false)

    const handleChangeMileage = () => {
        console.log('handleChangeMileage')
    }

    const handleShowAllTotalStepup = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

  return (
    <div>
    <CommonButton 
        label={'마일리지로 변환하기'} 
        size={'sm'} 
        radius={'sm'} 
        color={'default'} 
        variant={'flat'} 
        onClick={handleChangeMileage} 
    />
    <CommonButton 
        label={'전체보기'} 
        size={'sm'} 
        radius={'sm'} 
        color={'default'} 
        variant={'flat'} 
        onClick={handleShowAllTotalStepup} 
    />
    <div>
    <div>
      <CommonModal 
        title={'전체 스텝업'} 
        contents={<AllTotalStepupP />} 
        size={'2xl'} 
        isOpen={isOpen} 
        onClose={onClose}
        useCustomBtn={true}
        customButton={
            <>
                <div>
                    <CommonButton 
                        label={'확인'} 
                        color={'default'} 
                        variant={'flat'} 
                        onClick={onClose}                    
                    />
                </div>
            </>
        }
      />
    </div>
    </div>
    </div>
  )
}

