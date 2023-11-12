import Link from 'next/link'
import React from 'react'

export default function Header(){
  return (
    <div>
      <div className="p-5 bg-black flex">
          <p className="mr-3 text-white">STEP-UP</p>
          <p className="text-white">|</p>
          <p className="mx-3 text-white">사원 이름</p>
          {/* <p>|</p> */}
          <p className="mx-3 cursor-pointer text-white">
            <Link href="/mypage/KimYoungHyeon">나의 현황</Link>
          </p>
          {/* <p>|</p> */}
          <p className="mx-3 cursor-pointer text-white">
            <Link href="/confirm">결재 현황</Link>
          </p>
          {/* <p>|</p> */}
          <p className="mx-3 cursor-pointer text-white">
            <Link href="/example">공통 컴포넌트 보러가기</Link>
          </p>
        </div>
    </div>
  )
}

