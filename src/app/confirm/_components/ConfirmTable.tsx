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
        const response = await fetch(
          `/management/approval?searchType=${searchData?.searchType}&keyword=${searchData?.keyword}&approvalStatus=${searchData?.approvalStatus}&startDate=${searchData?.startDate}&endDate=${searchData?.endDate}&currentPage=1&limit=10`
        );

        const result = await response.json();
        setData(result);
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
