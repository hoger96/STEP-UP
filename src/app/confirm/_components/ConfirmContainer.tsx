"use client";
import { useState } from "react";
import ConfirmTable from "./ConfirmTable";
import { SearchBar } from "./SearchBar";

interface ISearchParams {
  searchType: string;
  keyword: string;
  approvalStatus: string;
  startDate: string;
  endDate: string;
  currentPage: number;
  limit: number;
}

export default function ConfirmContainer() {
  const [searchData, setSearchData] = useState<ISearchParams | null>(null);
  const handleSearch = (searchParams: ISearchParams) => {
    setSearchData(searchParams);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ConfirmTable searchData={searchData} />
    </div>
  );
}
