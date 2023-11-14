"use client"

import { Card, CardBody } from '@nextui-org/react'
import axios from 'axios'
import { useEffect } from 'react'

export default function StepupStatus(props) {

    
const getTotalStepupData = async(approvalId="APV_0000000008") => {
    try {
      const result = await axios.get(`/stepup/api/management/approval/${approvalId}`)
      console.log('result', result.data)
  
    } catch (e) {
      console.error(e)
    }
  }

const getCommonCode = async(cdGrp: string) => {
    try {
        const result = await axios.get('/stepup/api/management/common/code', {
            params: {
                cdGrp: cdGrp 
            }
        })

        console.log('result', result.data)
    } catch (e) {
        console.error(e)
    }
}

  useEffect(()=> {
    getTotalStepupData()
    getCommonCode('APPROVAL_STATUS')
  })
  
  return (
    
    <div>
        <div className='flex max-w-[1500px] m-auto my-4'>
            <p>임규리</p>
            <p>사원</p>
        </div>
    <Card className="max-w-[1500px] min-h-[150px] m-auto">
        <CardBody>
            <div>
                <span>STEP-UP</span>
            </div>
            <div className='m-auto'>
                <div className='flex'>
                    <div className='inline-flex mr-4'>
                        <span className='mr-4 text-green-500'>TODAY</span>
                        <p>{`${1}/${3}`}</p>
                    </div>
                    <div className='inline-flex mr-4'>
                        <span className='mr-4 text-red-400'>TOTAL</span>
                        <p>{4}</p>
                    </div>
                    <div className='inline-flex mr-4'>
                        <span className='mr-4 text-blue-400'>MILEAGE</span>
                        <p>{8}</p>
                    </div>
                </div>
            </div>
        </CardBody>
    </Card>
    </div>
  )
}


