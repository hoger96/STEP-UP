"use client"

import { CommonDatePicker } from '@/app/components/DatePicker'
import CommonInput from '@/app/components/Input'
import { CommonSelect } from '@/app/components/Select'
import React, { useState } from 'react'


const ModalExample = () => {
  const [input, setInput] = useState('')
  const [date, setDate] = useState(new Date())
  const [select, setSelect] = useState<string[]>()
  const exampleData = [
    { label: "전체", value: "ALL" },
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog" },
    { label: "Elephant", value: "elephant" },
    { label: "Lion", value: "lion" },
    { label: "Tiger", value: "tiger" },
  ];

  return (
    <div>
      <CommonDatePicker
        name="일정"
        selected={date}
        onChange={(date: Date) => setDate(date)}
      />
      <CommonInput value={input}/>
      <CommonSelect 
          data={exampleData}
          selectValue={select}
          label="default"
          labelType="outside-left"
          onChange={(e: any) => {setSelect([e.target.value])}}
        />
    </div>
  )
}

export default ModalExample
