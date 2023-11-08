"use client"

import { useState } from "react";
import { CommonSelect } from "../components/Select";

export default function Home() {

  // select example data
  const exampleData = [
    {label: "전체", value: 'ALL'},
    {label: "Cat", value: "cat"},
    {label: "Dog", value: "dog"},
    {label: "Elephant", value: "elephant"},
    {label: "Lion", value: "lion" },
    {label: "Tiger", value: "tiger"}
  ]

  // select example value
  const [selectValue, setSelectValue] = useState([])

  // select example function
  function acSelectChange(e: any) {
    setSelectValue([e.target.value])
  }

  return (
<div>
    <h1>UI EXAMPLE</h1>

    <div>
      <div>Button</div>
      <div></div>
    </div>
    <div>
      <div>SELECT</div>
      <div>
        <span>default select</span>
        <CommonSelect 
          data={exampleData}
          value={selectValue}
          selectValue={selectValue}
          label="default"
          labelType="outside-left"
          placeholer="값을 선택해주세요."
          onChange={acSelectChange}
        />
      </div>
    </div>
    <div>
      <div>INPUT</div>
      <div></div>
    </div>
    <div>
      <div>DATE PICKER</div>
      <div></div>
    </div>
    <div>
      <div>TABLE</div>
      <div></div>
    </div>
    <div>
      <div>TAB</div>
      <div></div>
    </div>
</div>
  )
}
