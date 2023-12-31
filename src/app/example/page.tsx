"use client";

import { useEffect, useState } from "react";
import { CommonSelect } from "../components/Select";
import CommonButton from "../components/Buttons";
import { CommonDatePicker } from "../components/DatePicker";
import CommonTable from "../components/Table";
import React from "react";
import { Chip, ChipProps, Tooltip, useDisclosure } from "@nextui-org/react";
import CommonInput from "../components/Input";
import CommonModal from "../components/Confirm";
import ModalExample from "../mypage/_components/ModalExample";
import { ToastContainer, toast } from "react-toastify";
import cn from "clsx";

export default function Home() {
  // ----------------------------- input -----------------------------------

  const [inputValue, setInputValue] = useState<string>("");

  // ----------------------------- select ----------------------------------
  // select example data
  const exampleData = [
    { label: "전체", value: "ALL" },
    { label: "Cat", value: "cat" },
    { label: "Dog", value: "dog" },
    { label: "Elephant", value: "elephant" },
    { label: "Lion", value: "lion" },
    { label: "Tiger", value: "tiger" },
  ];

  // select example value
  const [selectValue, setSelectValue] = useState<string[]>();
  const [selectDefaultValue, setSelectDefaultValue] = useState<string[]>();

  // select example function
  function acSelectChange(e: any) {
    setSelectValue([e.target.value]);
  }

  // default setting
  useEffect(() => {
    setSelectDefaultValue(["ALL"]);
  }, []);

  // -------------------------- button ------------------------------------

  const clickButton = () => {
    toast("토스트 알람");
  };

  // -------------------------- datepicker --------------------------------

  const [date, setDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState();

  // --------------------------- tabel -----------------------------------

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "action",
      label: "ACTION",
    },
  ];

  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
      id: "a1",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
      id: "b1",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
      id: "c1",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
      id: "d1",
    },
    {
      key: "5",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
      id: "e1",
    },
  ];

  const statusColorMap: Record<string, ChipProps["color"]> = {
    Active: "success",
    Paused: "danger",
    Vacation: "warning",
  };

  const [currentPage, setCurrnetPage] = useState<number>(1);

  type Item = (typeof rows)[0];

  const renderCell = React.useCallback((items: Item, columnKey: string) => {
    const cellValue = items[columnKey as keyof Item];

    switch (columnKey) {
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[items.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "action":
        return (
          <Tooltip
            color="secondary"
            content={
              items.status !== "Active" ? "취소가 불가합니다." : "신청 취소하기"
            }
          >
            <span
              className={cn("inline-block text-danger cursor-pointer", {
                "!cursor-not-allowed": items.status !== "Active",
              })}
            >
              <CommonButton
                label={"삭제"}
                size={"sm"}
                radius={"sm"}
                color={"default"}
                variant={"bordered"}
                isDisabled={items.status !== "Active"}
                onClick={() => console.log("삭제", items["id"])}
              />
            </span>
          </Tooltip>
        );
      default:
        return cellValue;
    }
  }, []);

  // ------------------------ confrim -------------------------------------
  const [isOpen, setIsOpen] = useState(false);

  function openPopup() {
    setIsOpen(true);
  }
  function closePopup() {
    setIsOpen(false);
  }

  return (
    <div>
      <h3>UI EXAMPLE</h3>
      <div>
        <div className="m-5">
          <h2>Button</h2>
          <div>
            <span>default button ::: </span>
            <CommonButton
              label="버튼"
              size="md"
              radius="md"
              color="primary"
              variant="solid"
              onClick={() => clickButton()}
            />
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
          <div>
            <span>disabled button ::: </span>
            <CommonButton
              label="버튼"
              size="md"
              radius="md"
              color="primary"
              variant="solid"
              isDisabled={true}
              onClick={() => clickButton()}
            />
          </div>
        </div>
        <div className="m-5">
          <div>DATE PICKER</div>
          <div>
            <span>default datepicker</span>
            <CommonDatePicker
              name="일정"
              selected={date}
              onChange={(date: Date) => setDate(date)}
            />
          </div>
          <div>
            <span>placeholder datepicker</span>
            <CommonDatePicker
              name="일정"
              selected={selectDate}
              onChange={(date: any) => setSelectDate(date)}
              placeholderText="신청일자를 선택해주세요."
            />
          </div>
          <div>
            <span>readonly datepicker</span>
            <CommonDatePicker
              name="일정"
              selected={date}
              onChange={(date: Date) => setDate(date)}
              readOnly
            />
          </div>
          <div>
            <span>disabled datepicker</span>
            <CommonDatePicker
              name="일정"
              selected={date}
              onChange={(date: Date) => setDate(date)}
              disabled
            />
          </div>
        </div>
        <div className="m-5">
          <h2>SELECT</h2>
          <div>
            <CommonSelect
              data={exampleData}
              selectValue={selectValue}
              label="select"
              labelType="outside-left"
              placeholer="값을 선택해주세요."
              onChange={acSelectChange}
            />
            <CommonSelect
              data={exampleData}
              selectValue={selectDefaultValue}
              label="default"
              labelType="outside-left"
              onChange={(e: any) => {
                setSelectDefaultValue([e.target.value]);
              }}
            />
            <CommonSelect
              data={exampleData}
              value={selectValue}
              label="disabled"
              labelType="outside-left"
              placeholer="값을 선택해주세요."
              isDisabled={true}
            />
            <CommonSelect
              data={exampleData}
              value={selectValue}
              label="required"
              labelType="outside-left"
              placeholer="값을 선택해주세요."
              isRequired={true}
              onChange={(e: any) => {
                setSelectValue([e.target.value]);
              }}
            />
            <CommonSelect
              data={exampleData}
              value={selectValue}
              label="validation"
              labelType="outside-left"
              placeholer="값을 선택해주세요."
              isRequired={true}
              isInvalid={!selectValue?.length}
              errorMessage={!selectValue?.length ? "필수 선택 값입니다." : ""}
              onChange={(e: any) => {
                setSelectValue([e.target.value]);
              }}
            />
          </div>
        </div>
        <div className="m-5">
          <h2>INPUT</h2>
          <div>
            <CommonInput
              value={inputValue}
              label="input"
              placeholder="값을 입력해주세요."
              onValueChange={setInputValue}
            />
            <CommonInput
              value={inputValue}
              label="disabled"
              isDisabled={true}
              placeholder="값을 입력해주세요."
              onValueChange={setInputValue}
            />
            <CommonInput
              value={inputValue}
              label="readonly"
              isReadOnly={true}
              placeholder="값을 입력해주세요."
              onValueChange={setInputValue}
            />
            <CommonInput
              value={inputValue}
              label="required"
              isRequired={true}
              placeholder="값을 입력해주세요."
              onValueChange={setInputValue}
            />
            <CommonInput
              value={inputValue}
              label="validation"
              onValueChange={setInputValue}
              isInvalid={!inputValue?.length}
              isRequired={true}
              placeholder="값을 입력해주세요."
              errorMessage={!inputValue?.length ? "필수 입력 값입니다." : ""}
            />
          </div>
        </div>
      </div>
      <div className="m-5">
        <h2>TABLE</h2>
        <div>
          <CommonTable
            tablekey="example table"
            columns={columns}
            rows={rows}
            useRenderCell={true}
            renderCell={renderCell}
            emptyContent={"조회된 데이터가 없습니다."}
            onChange={setCurrnetPage}
            currentPage={currentPage}
            total={5}
            uniqueKey={""}
            onRowAction={function (key: React.Key): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div>
          <CommonTable
            tablekey="example table 1"
            columns={columns}
            rows={rows}
            emptyContent={"조회된 데이터가 없습니다."}
            onChange={setCurrnetPage}
            currentPage={currentPage}
            total={5}
            uniqueKey={""}
            onRowAction={function (key: React.Key): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div>
          <div>no data</div>
          <CommonTable
            tablekey="example table"
            columns={columns}
            rows={[]}
            emptyContent={"조회된 데이터가 없습니다."}
            uniqueKey={""}
            total={0}
            onRowAction={function (key: React.Key): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
      <div className="m-5">
        <div>Modal Popup</div>
        <CommonButton
          label={"모달 오픈"}
          size={"sm"}
          radius={"sm"}
          color={"default"}
          variant={"flat"}
          onClick={openPopup} // 팝업 열림 처리
        />
        <CommonModal
          contents={<ModalExample />}
          title={"컨펌 모달"}
          isOpen={isOpen}
          size={"lg"}
          onConfirmBtn={() => {
            closePopup(); // 팝업 닫힘 처리
          }}
          onClose={closePopup} // 팝업 상단 x 버튼 닫힘 처리
        />
      </div>
    </div>
  );
}
