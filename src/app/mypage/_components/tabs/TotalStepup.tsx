"use client";

import { useRenderCtx } from "@/app/_providers/render";
import CommonButton from "@/app/components/Buttons";
import CommonModal from "@/app/components/Confirm";
import CommonTable from "@/app/components/Table";
import { Tooltip } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { StringDecoder } from "string_decoder";

interface ITotalStepupData {
  rowNum: number;
  achievementDt: string;
  mileageUseYn: string;
}

interface IProps {
  shouldRefreshTable: boolean;
  requestId: string;
}

interface IRows {
  rowNum: string;
  achievementDt: string;
  mileageUseYn: string;
  stepUpId: string;
}

interface ITotalResponse<T> {
  data: T[];
  currentPage: number;
  totalPage: number;
  totalCount: number;
  limit: number;
}

interface ITotalTable {
  rowNum: number;
  stepUpId: string;
  achievementDt: string;
  mileageUseYn: string;
  delYn: string;
}

export default function TotalStepup(props: IProps) {
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

  const [rows, setRows] = useState<ITotalStepupData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalPage, setTotalPage] = useState<number>();
  const [isConfirmOpen, setIsConfrimOpen] = useState(false);
  const [stepupId, setStepupId] = useState<string>();
  const router = useRouter();
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
      initTotalSetupTable(props.requestId, currentPage ?? 1);
      toast.success("삭제되었어요!");
    }
  };

  const renderCell = React.useCallback((items: IRows, columnKey: string) => {
    const cellValue = items[columnKey as keyof IRows];

    switch (columnKey) {
      case "action":
        return (
          <Tooltip color="danger" content={"버튼을 눌러 삭제해보아요!"}>
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <CommonButton
                label={"삭제"}
                size={"sm"}
                radius={"sm"}
                color={"secondary"}
                variant={"bordered"}
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

  // const getTotalStepupData = async (userId: string, currentPage: number) => {
  //   try {
  //     const result = await axios.get("/stepup/api/user/list/exercise", {
  //       params: {
  //         currentPage,
  //         limit: 5,
  //         userId,
  //       },
  //     });
  //     return result.data.body;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const initTotalSetupTable = async (userId: string, currentPage: number) => {
    await renderCtx?.fetchTotalTable(userId, currentPage);
    // if (result) {
    //   setRows(result.data);
    //   setCurrentPage(result.currentPage);
    //   setTotalPage(result.totalPage);
    // }
  };

  const onPageChange = (page: number) => {
    // if (!props.requestId) {
    //   return;
    // }
    if (props.requestId) initTotalSetupTable(props.requestId, page);
    else {
      initTotalSetupTable(renderCtx?.userId, page);
    }
  };

  // useEffect(() => {
  //   if (props.shouldRefreshTable && props.requestId) {
  //     initTotalSetupTable(props.requestId, 1);
  //   }
  // }, [props.shouldRefreshTable]);

  useEffect(() => {
    if (props.requestId) {
      initTotalSetupTable(props.requestId, 1);
    }
  }, [props.requestId]);
  useEffect(() => {
    if (!props.requestId) initTotalSetupTable(renderCtx?.userId, 1);
  }, [renderCtx?.userId]);

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
        currentPage={renderCtx?.currentPage}
        total={renderCtx?.totalPage ?? 0}
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
