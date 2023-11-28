"use client";

import CommonButton from "@/app/components/Buttons";
import CommonTable from "@/app/components/Table";
import { Chip, ChipProps, Tooltip } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import cn from "clsx";
import CommonModal from "@/app/components/Confirm";

interface IProps {
  shouldRefreshTable: boolean;
  requestId: string;
}

interface IRows {
  approvalId: string;
  approvalReqDt: string;
  approvalReqType: string;
  approvalReqTypeNm: string;
  approvalStus: string;
  approvalStusNm: string;
  rowNum: string;
}

export default function MileageStatus(props: IProps) {
  const router = useRouter();
  const columns = [
    {
      key: "rowNum",
      label: "번호",
    },
    {
      key: "draftDt",
      label: "결재 신청 일자",
    },
    {
      key: "approvalReqDt",
      label: "마일리지 사용 일자",
    },
    {
      key: "approvalReqTypeNm",
      label: "신청 타입",
    },
    {
      key: "approvalStusNm",
      label: "결재 상태",
    },
    {
      key: "action",
      label: "",
    },
  ];

  const userId = sessionStorage.getItem("loginUserId");
  const [rows, setRows] = useState([]);
  const [isConfirmOpen, setIsConfrimOpen] = useState(false);
  const [approvalId, setApprovalId] = useState<string>()
  // type Item = (typeof rows)[0];

  const statusColorMap: Record<string, ChipProps["color"]> = {
    APPROVAL: "success",
    REJECT: "danger",
    WAIT: "warning",
    CANCEL: "secondary",
  };

  const getRequestData = (approvalId: string, userId: string) => {
    return {
      approvalId,
      userId,
    };
  };

  const cancelApproval = async (data: {
    approvalId: string;
    userId: string;
  }) => {
    try {
      await axios.put("/stepup/api/user/cancel/mileage", data);

      return true;
    } catch (e) {
      console.error(e);

      return false;
    }
  };

  const handleCancelBtnClick = async (approvalId: string, userId: string) => {
    const data = getRequestData(approvalId, userId);
    if (!data) {
      return;
    }
    const isSuccess = await cancelApproval(data);
    if (isSuccess) {
      setIsConfrimOpen(false)
      initMileageStatusTable(userId);
      toast.success("신청이 취소되었어요!");
    }
  };

  const renderCell = React.useCallback((items: IRows, columnKey: string) => {
    const cellValue = items[columnKey as keyof IRows];

    switch (columnKey) {
      case "confirmType":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[items.approvalStus]}
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
              userId !== props.requestId
                ? "내 신청만 취소할 수 있어요!"
                : items?.approvalStus !== "WAIT"
                  ? "신청을 취소할 수 없어요!"
                  : "버튼을 누르면 신청을 취소할 수 있어요!"
            }
          >
            <span
              className={cn("inline-block text-danger cursor-pointer", {
                "!cursor-not-allowed":
                  items?.approvalStus !== "WAIT" || userId !== props.requestId,
              })}
            >
              <CommonButton
                label={"신청 취소"}
                size={"sm"}
                radius={"sm"}
                color={"secondary"}
                variant={"bordered"}
                isDisabled={
                  items?.approvalStus !== "WAIT" || userId !== props.requestId
                }
                onClick={() => {
                  setApprovalId(items?.approvalId)
                  setIsConfrimOpen(true)
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

  const getMileageStatusData = async (userId: string) => {
    try {
      const result = await axios.get("/stepup/api/user/list/mileage", {
        params: {
          userId,
        },
      });
      return result.data.body;
    } catch (e) {
      console.error(e);
    }
  };

  const initMileageStatusTable = async (userId: string) => {
    if (!userId) {
      router.push("/login");
      return;
    }

    const result = await getMileageStatusData(userId);
    setRows(result);
  };

  useEffect(() => {
    if (props.shouldRefreshTable && props.requestId) {
      initMileageStatusTable(props.requestId);
    }
  }, [props.shouldRefreshTable]);

  useEffect(() => {
    if (!props.requestId) {
      return;
    }

    initMileageStatusTable(props.requestId);
  }, []);

  return (
    <div>
      <CommonTable
        emptyContent={"조회된 데이터가 없습니다."}
        tablekey={"mileage-status-table"}
        useRenderCell={true}
        renderCell={renderCell}
        columns={columns}
        rows={rows}
        uniqueKey={"rowNum"}
        total={0}
      />
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      <CommonModal
        title={"확인"}
        contents={"마일리지 사용 신청을 취소하시겠습니까?"}
        isOpen={isConfirmOpen}
        size={"sm"}
        onClose={() => {
          setIsConfrimOpen(false);
        }}
        onConfirmBtn={() => handleCancelBtnClick(approvalId ?? '', userId ? userId : "")}
      />
    </div>
  );
}
