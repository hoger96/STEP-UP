import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

interface CommonTableProps<T> {
  total: number;
  page: number;
  renderCell?: any;
  useRenderCell?: boolean;
  onChange?: ((page: number) => void) | undefined;
  currentPage?: number | undefined;
  emptyContent: string;
  tablekey: string;
  columns: Array<{ key: string; label: string }>;
  rows: Array<T>;
}

export default function CommonTable(props: CommonTableProps<any>) {
  return (
    <div>
      <Table
        aria-label={props.tablekey}
        bottomContent={
          props.total && props.total > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={props.currentPage} // 현재 페이지
                total={props.total ? props.total : 0} // 전체 페이지
                onChange={props.onChange}
              />
            </div>
          ) : null
        }
        bottomContentPlacement="outside"
      >
        <TableHeader columns={props.columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={props.emptyContent} items={props.rows}>
          {(item: any) => (
            <TableRow key={item.rowNum}>
              {(columnKey) => {
                if (props.useRenderCell ? props.useRenderCell : false) {
                  return (
                    <TableCell>{props.renderCell(item, columnKey)}</TableCell>
                  );
                } else {
                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                }
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
