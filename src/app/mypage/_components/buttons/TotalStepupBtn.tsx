'use client'

import CommonButton from '@/app/components/Buttons'
import CommonModal from '@/app/components/Confirm'
import React, { useState } from 'react'
import AllTotalStepupP from '../popup/AllTotalStepupP'

interface IProps {
    requestId: string
    onRefreshTable: () => void
}

export default function TotalStepupBtn(props: IProps) {

    const userId = sessionStorage.getItem('loginUserId')
    const [isOpen, setIsOpen] = useState(false)

    const handleChangeMileage = () => {
        props.onRefreshTable()
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
                isDisabled={userId !== props.requestId}
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
                        contents={<AllTotalStepupP requestId={props.requestId} />}
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

