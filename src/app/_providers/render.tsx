"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

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
type TRender = any;
type RTU = ReturnType<typeof useState<TRender | null>>;
type RenderContextType = {
  userId: RTU[0];
  setUserId: RTU[1];
  userNm: RTU[0];
  setUserNm: RTU[1];
  master: RTU[0];
  setMaster: RTU[1];
  hold: RTU[0];
  setHold: RTU[1];
  today: RTU[0];
  setToday: RTU[1];
  total: RTU[0];
  setTotal: RTU[1];
  mileage: RTU[0];
  setMileage: RTU[1];
  mileageRow: RTU[0];
  setMileageRow: RTU[1];
  todayRow: RTU[0];
  setTodayRow: RTU[1];
  totalRow: RTU[0];
  setTotalRow: RTU[1];
  total;
  login: (userId: string, password: string) => Promise<void>;
  fetchSession: () => Promise<void>;
  fetchTodayTable: (userId: string) => Promise<void>;
  fetchMileageTable: (userId: string) => Promise<void>;
  fetchTotalTable: (userId: string, currentPage: number) => Promise<void>;
};

export const RenderContext = createContext<RenderContextType | undefined>(
  undefined
);

export default function RenderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string>();
  const [userNm, setUserNm] = useState<string>();
  const [master, setMaster] = useState<string>();
  const [hold, setHold] = useState<string>();
  const [today, setToday] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [mileage, setMileage] = useState<number>();
  const [mileageRow, setMileageRow] = useState<[]>([]);
  const [todayRow, setTodayRow] = useState<[]>([]);
  const [totalRow, setTotalRow] = useState<[]>([]);

  const login = async (userId: string, password: string) => {
    try {
      const result = await axios.post("/stepup/api/login", {
        userId,
        password,
      });
      setUserId(result.data.body.userId);
      setUserNm(result.data.body.userNm);
      setMaster(result.data.body.master);
      setHold(result.data.body.holdYn);
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchSession = async () => {
    try {
      const result = await axios.get("/stepup/api/user", {
        params: {
          userId,
        },
      });
      setHold(result.data.body.holdYn);
      setToday(result.data.body.todayStepUpCnt);
      setTotal(result.data.body.totalStepUpCnt);
      setMileage(result.data.body.mileageCnt);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTodayTable = async (userId: string) => {
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

  const fetchMileageTable = async (userId: string) => {
    try {
      const result = await axios.get("/stepup/api/user/list/mileage", {
        params: {
          userId,
        },
      });
      setMileageRow(result.data.body);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTotalTable = async (userId: string, currentPage: number) => {
    try {
      const result = await axios.get("/stepup/api/user/list/exercise", {
        params: {
          currentPage,
          limit: 5,
          userId,
        },
      });
      console.log("...", result.data.body);
      setTotalRow(result.data.body);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSession();
    if (userId) fetchTotalTable(userId, 1);
  }, []);

  return (
    <RenderContext.Provider
      value={{
        userId,
        setUserId,
        userNm,
        setUserNm,
        master,
        setMaster,
        hold,
        setHold,
        today,
        setToday,
        total,
        setTotal,
        mileage,
        setMileage,
        mileageRow,
        setMileageRow,
        todayRow,
        setTodayRow,
        totalRow,
        setTotalRow,
        login,
        fetchSession,
        fetchTodayTable,
        fetchMileageTable,
        fetchTotalTable,
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
