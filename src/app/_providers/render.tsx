"use client";

import axios from "axios";
import { log } from "console";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type TRender = any;
type RTU = ReturnType<typeof useState<TRender | null>>;
type RenderContextType = {
  isReadMode: RTU[0];
  setIsReadMode: RTU[1];
  requestId: RTU[0];
  setRequestId: RTU[1];
  userId: RTU[0];
  setUserId: RTU[1];
  userNm: RTU[0];
  setUserNm: RTU[1];
  masterYn: RTU[0];
  setMasterYn: RTU[1];
  holdYn: RTU[0];
  setHoldYn: RTU[1];
  today: RTU[0];
  setToday: RTU[1];
  total: RTU[0];
  setTotal: RTU[1];
  mileage: RTU[0];
  setMileage: RTU[1];
  todayRow: RTU[0];
  setTodayRow: RTU[1];
  totalRow: RTU[0];
  setTotalRow: RTU[1];
  totalCurrentPage: RTU[0];
  setTotalCurrentPage: RTU[1];
  totalTotalPage: RTU[0];
  setTotalTotalPage: RTU[1];
  mileageRow: RTU[0];
  setMileageRow: RTU[1];
  mileageCurrentPage: RTU[0];
  setMileageCurrentPage: RTU[1];
  mileageTotalPage: RTU[0];
  setMileageTotalPage: RTU[1];
  holdRow: RTU[0];
  setHoldRow: RTU[1];
  holdCurrentPage: RTU[0];
  setHoldCurrentPage: RTU[1];
  holdTotalPage: RTU[0];
  setHoldTotalPage: RTU[1];
  fetchSession: () => Promise<void>;
  changeShowMode: (readModeYn: boolean) => void;
  fetchUserCurrentStatus: (id: string) => Promise<void>;
  fetchTodayStepup: (userId: string) => Promise<void>;
  fetchMileageTable: (userId: string, currentPage: number) => Promise<void>;
  fetchTotalTable: (userId: string, currentPage: number) => Promise<void>;
  fetchHoldTable: (userId: string, currentPage: number) => Promise<void>;
  setSessionData: () => void;
};

export const RenderContext = createContext<RenderContextType | undefined>(
  undefined
);

export default function RenderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReadMode, setIsReadMode] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [userNm, setUserNm] = useState<string>();
  const [masterYn, setMasterYn] = useState<string>();
  const [holdYn, setHoldYn] = useState<string>();
  // 현황
  const [today, setToday] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [mileage, setMileage] = useState<number>();
  // 오늘의 스텝업
  const [todayRow, setTodayRow] = useState<[]>([]);
  // 연속 스텝업
  const [totalRow, setTotalRow] = useState<[]>([]);
  const [totalCurrentPage, setTotalCurrentPage] = useState<number>();
  const [totalTotalPage, setTotalTotalPage] = useState<number>();
  // 마일리지 사용 현황
  const [mileageRow, setMileageRow] = useState<[]>([]);
  const [mileageCurrentPage, setMileageCurrentPage] = useState<number>();
  const [mileageTotalPage, setMileageTotalPage] = useState<number>();
  // 보류 내역
  const [holdRow, setHoldRow] = useState<[]>([]);
  const [holdCurrentPage, setHoldCurrentPage] = useState<number>();
  const [holdTotalPage, setHoldTotalPage] = useState<number>();

  const router = useRouter();

  // 세션 조회
  const fetchSession = async () => {
    try {
      const result = await axios.get("/stepup/api/common/session");

      if (!result) {
        router.push("/login");
      }
      return result.data.body;
    } catch (e) {
      console.error(e);
    }
  };

  // 요청자 상세보기 -> 읽기모드 설정
  const changeShowMode = (readModeYn: boolean) => {
    setIsReadMode(readModeYn);
  };

  // 사용자 나의 현황 정보 조회
  const fetchUserCurrentStatus = async (userId: string) => {
    try {
      const result = await axios.get("/stepup/api/user", {
        params: {
          userId,
        },
      });
      setHoldYn(result.data.body.holdYn);
      setToday(result.data.body.todayStepUpCnt);
      setTotal(result.data.body.totalStepUpCnt);
      setMileage(result.data.body.mileageCnt);
    } catch (e) {
      console.error(e);
    }
  };

  // 오늘의 스텝업 테이블 데이터 조회
  const fetchTodayStepup = async (userId: string) => {
    try {
      const result = await axios.get("/stepup/api/user/list/today-exercise", {
        params: {
          userId,
        },
      });

      setTodayRow(result.data.body);
    } catch (e) {
      console.error(e);
    }
  };

  // 연속 스텝업 테이블 데이터 조회
  const fetchTotalTable = async (userId: string, currentPage: number) => {
    try {
      const result = await axios.get("/stepup/api/user/list/exercise", {
        params: {
          currentPage,
          limit: 5,
          userId,
        },
      });
      setTotalRow(result.data.body.data);
      setTotalCurrentPage(result.data.body.currentPage);
      setTotalTotalPage(result.data.body.totalPage);
    } catch (e) {
      console.error(e);
    }
  };

  // 마일리지 사용 현황 테이블 데이터 조회
  const fetchMileageTable = async (userId: string, currentPage: number) => {
    try {
      const result = await axios.get("/stepup/api/user/list/mileage", {
        params: {
          userId,
          currentPage,
          limit: 5,
        },
      });
      setMileageRow(result.data.body.data);
      setMileageCurrentPage(result.data.body.currentPage);
      setMileageTotalPage(result.data.body.totalPage);
    } catch (e) {
      console.error(e);
    }
  };

  // 보류 내역 테이블 데이터 조회
  const fetchHoldTable = async (id: string, currentPage: number) => {
    try {
      const result = await axios.get(
        "/stepup/api/user/entire-list/hold-exercise",
        {
          params: {
            userId: id,
            currentPage,
            limit: 5,
          },
        }
      );
      setHoldRow(result.data.body.data);
      setHoldCurrentPage(result.data.body.currentPage);
      setHoldTotalPage(result.data.body.totalPage);
    } catch (e) {
      console.error(e);
    }
  };

  const setSessionData = async () => {
    const result = await fetchSession();
    if (result) {
      setUserId(result.userId);
      setUserNm(result.userNm);
      setMasterYn(result.masterYn);
      setHoldYn(result.holdYn);
    }
  };

  useEffect(() => {
    setSessionData();
  }, []);

  return (
    <RenderContext.Provider
      value={{
        isReadMode,
        setIsReadMode,
        requestId,
        setRequestId,
        userId,
        setUserId,
        userNm,
        setUserNm,
        masterYn,
        setMasterYn,
        holdYn,
        setHoldYn,
        today,
        setToday,
        total,
        setTotal,
        mileage,
        setMileage,
        todayRow,
        setTodayRow,
        totalRow,
        setTotalRow,
        totalCurrentPage,
        setTotalCurrentPage,
        totalTotalPage,
        setTotalTotalPage,
        mileageRow,
        setMileageRow,
        mileageCurrentPage,
        setMileageCurrentPage,
        mileageTotalPage,
        setMileageTotalPage,
        holdRow,
        setHoldRow,
        holdCurrentPage,
        setHoldCurrentPage,
        holdTotalPage,
        setHoldTotalPage,
        fetchSession,
        changeShowMode,
        fetchUserCurrentStatus,
        fetchTodayStepup,
        fetchMileageTable,
        fetchTotalTable,
        fetchHoldTable,
        setSessionData,
      }}
    >
      {children}
    </RenderContext.Provider>
  );
}

export const useRenderCtx = () => {
  const ctx = useContext(RenderContext);
  if (ctx === undefined) {
    console.log("no ctx");
  }
  return ctx;
};
