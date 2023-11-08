'use client'
import CommonButton from '../components/Buttons'

export default function Home() {
  return (
    <div>
        <h1>결재 현황 페이지</h1>
        <CommonButton 
        label="클릭"
        size="sm"
        radius="md"
        color="primary"
        variant="solid"
        onClick={() => alert('dd')}  />
    </div>
  )
}
