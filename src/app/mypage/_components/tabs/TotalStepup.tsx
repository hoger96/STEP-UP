"use client";

import { useRenderCtx } from "@/app/_providers/render";
import CommonButton from "@/app/components/Buttons";
import CommonModal from "@/app/components/Confirm";
import CommonTable from "@/app/components/Table";
import { Tooltip } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import cn from "clsx";

interface IRows {
  rowNum: string;
  achievementDt: string;
  mileageUseYn: string;
  stepUpId: string;
}

export default function TotalStepup() {
  const columns = [
    {
      key: "rowNum",
      label: "회차",
    },
    {
      key: "achievementDt",
      label: "스텝업 달성일",
    },
    {
      key: "action",
      label: "",
    },
  ];

  const [requestId, setRequestId] = useState<string>();
  const [isConfirmOpen, setIsConfrimOpen] = useState(false);
  const [stepupId, setStepupId] = useState<string>();
  const renderCtx = useRenderCtx();

  const deleteStepupList = async (stepUpId: string) => {
    try {
      await axios.delete(`/stepup/api/user/delete/exercise/${stepUpId}`);

      return true;
    } catch (e) {
      console.error(e);

      return false;
    }
  };

  const handleDeleteBtnClick = async (stepupId: string) => {
    const isSuccess = await deleteStepupList(stepupId);
    if (isSuccess) {
      setIsConfrimOpen(false);
      initTotalSetupTable(renderCtx?.userId, renderCtx?.totalCurrentPage); // 본인만 삭제 가능
      toast.success("삭제되었어요!");
    }
  };

  const renderCell = React.useCallback((items: IRows, columnKey: string) => {
    const cellValue = items[columnKey as keyof IRows];

    switch (columnKey) {
      case "action":
        return (
          <Tooltip
            color="secondary"
            content={
              renderCtx?.isReadMode
                ? "본인이 아닌 경우 삭제할 수 없어요"
                : "버튼을 눌러 삭제해보아요!"
            }
          >
            <span
              className={cn("inline-block text-danger cursor-pointer", {
                "!cursor-not-allowed": renderCtx?.isReadMode,
              })}
            >
              <CommonButton
                label={"삭제"}
                size={"sm"}
                radius={"sm"}
                color={"secondary"}
                variant={"bordered"}
                isDisabled={renderCtx?.isReadMode}
                onClick={() => {
                  setStepupId(items.stepUpId);
                  setIsConfrimOpen(true);
                }}
                className="border"
              />
            </span>
          </Tooltip>
        );
      default:
        return cellValue;
    }
  }, []);

  const initTotalSetupTable = async (userId: string, currentPage: number) => {
    await renderCtx?.fetchTotalTable(userId, currentPage);
    await renderCtx?.fetchUserCurrentStatus(userId);
  };

  // 페이지 변환
  const onPageChange = (page: number) => {
    if (!requestId) {
      return;
    }
    initTotalSetupTable(requestId, page);
  };

  useEffect(() => {
    if (!requestId) {
      return;
    }
    initTotalSetupTable(requestId, 1);
  }, [requestId]);

  useEffect(() => {
    if (!renderCtx?.isReadMode) {
      setRequestId(renderCtx?.userId); // 로그인 사용자 아이디
    } else {
      setRequestId(renderCtx.requestId); // 상세보기 사용자 아이디
    }
  }, []);

  return (
    <div>
      <CommonTable
        emptyContent={"조회된 데이터가 없습니다."}
        tablekey={"total-step-table"}
        useRenderCell={true}
        renderCell={renderCell}
        columns={columns}
        rows={renderCtx?.totalRow}
        uniqueKey={"rowNum"}
        currentPage={renderCtx?.totalCurrentPage}
        total={renderCtx?.totalTotalPage}
        onChange={(page) => onPageChange(page)}
      />
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      <CommonModal
        title={"확인"}
        contents={"스텝업 기록을 삭제하시겠습니까?"}
        isOpen={isConfirmOpen}
        size={"sm"}
        onClose={() => {
          setIsConfrimOpen(false);
        }}
        onConfirmBtn={() => handleDeleteBtnClick(stepupId ?? "")}
      />
    </div>
  );
}
