"use client";
import { useEffect, useState } from "react";

interface ISearchParams {
  searchType: string;
  keyword: string;
  approvalStatus: string;
  startDate: string;
  endDate: string;
}

export default function ConfirmTable({
  searchData,
}: {
  searchData: ISearchParams | null;
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("searchData", searchData);
        const response = await fetch("/management/approval");
        const result = await response.json();
        setData(result);
        console.log("result", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (searchData) {
      fetchData();
    }
  }, [searchData]);

  return <div>Data: {JSON.stringify(data)}</div>;
}
