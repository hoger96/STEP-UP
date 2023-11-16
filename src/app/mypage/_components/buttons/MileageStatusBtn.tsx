'use client'

import CommonButton from '@/app/components/Buttons'
import CommonModal from '@/app/components/Confirm'
import React, { useState } from 'react'
import UseMileageP from '../popup/UseMileageP'
import AllUsedMileageP from '../popup/AllUsedMileageP'

export default function MileageStatusBtn(){

    const [isUseMileagePOpen , setIsUseMileagePOpen] = useState(false)
    const [isAllUseMileagePOpen , setIsAllUseMileagePOpen] = useState(false)

    // 마일리지 사용 신청 팝업
    const handleUseMileage =() => {
        console.log('handleUseMileage')
        setIsUseMileagePOpen(true)
    }

    const oncloseUseMileageP = () => {
        setIsUseMileagePOpen(false)
    }

    const onConfirmUseMileageP = () => {
        console.log('마일리지 신청')
    }

    // 전체 마일리지 사용 현황 팝업
    const handleShowAllMileage = () => {
        setIsAllUseMileagePOpen(true)
        console.log('handleShowAllMileage')
    }

    const onCloseAllUseMileageP = () => {
        setIsAllUseMileagePOpen(false)
        console.log('onCloseAllUseMileageP')
    }

    return (
    <div>
    <CommonButton 
        label={'신청'} 
        size={'sm'} 
        radius={'sm'} 
        color={'default'} 
        variant={'flat'} 
        onClick={handleUseMileage} 
    />
    <CommonModal 
        title={'마일리지 사용 신청'} 
        contents={<UseMileageP />} 
        size={'xl'} 
        isOpen={isUseMileagePOpen} 
        onClose={oncloseUseMileageP}
        onConfirmBtn={onConfirmUseMileageP}
      />
    <CommonButton 
        label={'전체보기'} 
        size={'sm'} 
        radius={'sm'} 
        color={'default'} 
        variant={'flat'} 
        onClick={handleShowAllMileage} 
    />
    <CommonModal 
        title={'전체 마일리지 사용 현황'} 
        contents={<AllUsedMileageP />} 
        size={'xl'} 
        isOpen={isAllUseMileagePOpen} 
        onClose={onCloseAllUseMileageP}
        useCustomBtn={true}
        customButton={
            <>
                <div>
                    <CommonButton 
                        label={'확인'} 
                        color={'default'} 
                        variant={'flat'} 
                        onClick={onCloseAllUseMileageP}                    
                    />
                </div>
            </>
        }
      />
    </div>
  )
}

