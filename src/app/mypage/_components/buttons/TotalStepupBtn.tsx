'use client'

import CommonButton from '@/app/components/Buttons'
import CommonModal from '@/app/components/Confirm'
import React, { useState } from 'react'
import AllTotalStepupP from '../popup/AllTotalStepupP'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface IProps {
    requestId: string
    onRefreshTable: () => void
}

export default function TotalStepupBtn(props: IProps) {

    const [isConfirmOpen, setIsConfrimOpen] = useState(false)
    const userId = sessionStorage.getItem('loginUserId')
    const [isOpen, setIsOpen] = useState(false)

    const changeToMileage = async (userId: string) => {
        try {
            await axios.put(`/stepup/api/user/conversion/mileage/${userId}`)

            return true
        } catch (e) {
            if (e instanceof AxiosError) {
                toast.error(e?.response?.data.message)
            }
            return false
        }
    }

    const handleChaneMileageBtnClick = () => {
        setIsConfrimOpen(true)
    }

    const handleChangeMileage = async () => {
        if (!userId) {
            return
        }

        const isSuccess = await changeToMileage(userId)

        if (isSuccess) {
            setIsConfrimOpen(false)
            props.onRefreshTable()
            toast.success('1개의 마일리지가 생성되었어요!')
        }
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
                onClick={handleChaneMileageBtnClick}
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
            <CommonModal
                title={"스텝업 보류하기"}
                contents={'마일리지를 생성할래요?'}
                isOpen={isConfirmOpen}
                size={"sm"}
                onClose={() => {
                    setIsConfrimOpen(false);
                }}
                onConfirmBtn={handleChangeMileage}
            />
        </div>
    )
}

