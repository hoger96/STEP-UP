"use client";
import CommonModal from "@/app/components/Confirm";
import CommonTable from "@/app/components/Table";
import { Key, useEffect, useState } from "react";
import ConfirmPopup from "./ConfirmPopup";
import ApprovalButton from "./ApprovalButton";
import CommonButton from "@/app/components/Buttons";
import { ToastContainer, toast } from "react-toastify";

interface IManagementApproval {
  rowNum: number;
  approvalId: string;
  userNm: string;
  draftDt: string;
  approvalReqDt: string;
  approvalReqType: string;
  approvalReqTypeNm: string;
  approvalStus: string;
  approvalStusNm: string;
}

interface IWrap<T> {
  data: T[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
}

interface IUserInfo {
  approvalStatus: string;
  userId: string;
}

export default function ConfirmTable({
  onChange,
  approvalDataList,
  onDateUpdate,
}: {
  onChange: (page: number) => void;
  approvalDataList: IWrap<IManagementApproval> | undefined;
  onDateUpdate: () => void;
}) {
  const approvalColumns = [
    {
      key: "rowNum",
      label: "번호",
    },
    {
      key: "userNm",
      label: "사원 명",
    },
    {
      key: "draftDt",
      label: "결재 요청 일자",
    },
    {
      key: "approvalReqDt",
      label: "마일리지 신청 일자",
    },
    {
      key: "approvalReqTypeNm",
      label: "신청 타입",
    },
    {
      key: "approvalStusNm",
      label: "결재 상태",
    },
  ];
  const [data, setData] = useState<IManagementApproval[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0); // 결재 현황 목록 총 갯수
  const [totalPage, setTotalPage] = useState<number>(0); // 결재 현황 목록 총 페이지 수
  const [currentPage, setCurrentPage] = useState<number>(0); // 결재 현황 목록 현재 페이지
  // 핍업
  const [openSignal, setOpenSignal] = useState(false);
  const [popupId, setPopupId] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");
  const [userId, setUserId] = useState("");
  const setApprovalListData = (result: IWrap<IManagementApproval>) => {
    setData(result.data);
    setTotalCount(result.totalCount);
    setTotalPage(result.totalPage);
    setCurrentPage(result.currentPage);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    onChange(page);
  };

  const handleOpenPopup = (key: Key) => {
    setOpenSignal(true);
    const id = key.toString();
    setPopupId(id);
  };

  const handleClosePopup = (title: string) => {
    setOpenSignal(false);
    onDateUpdate();
    toast.success(`${title}되었습니다.`);
  };

  const handleUserDetail = (info: IUserInfo) => {
    setApprovalStatus(info.approvalStatus);
    setUserId(info.userId);
  };

  useEffect(() => {
    if (approvalDataList) {
      setApprovalListData(approvalDataList);
    }
  }, [approvalDataList]);
  return (
    <div>
      <span>총 {totalCount} 개</span>
      <div>
        <CommonTable
          tablekey="approvalId"
          uniqueKey="approvalId"
          columns={approvalColumns}
          rows={data?.length > 0 ? data : []}
          emptyContent={"조회된 데이터가 없습니다."}
          page={currentPage}
          total={totalPage}
          onChange={handleChangePage}
          onRowAction={handleOpenPopup}
        />
        <ToastContainer autoClose={2000} hideProgressBar={true} />
      </div>
      <CommonModal
        title={"결재"}
        contents={
          <ConfirmPopup approvalId={popupId} onFetchStatus={handleUserDetail} />
        }
        isOpen={openSignal}
        size={"lg"}
        onConfirmBtn={() => {
          alert("dd");
        }}
        onClose={() => {
          setOpenSignal(false);
        }}
        useCustomBtn={true}
        customButton={
          <ApprovalButton
            approvalId={popupId}
            approvalStatus={approvalStatus}
            userId={userId}
            onClosePopup={(title: string) => handleClosePopup(title)}
          />
        }
      />
    </div>
  );
}
