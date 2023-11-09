import React from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination
} from "@nextui-org/react";

interface CommonTableProps {
  renderCell(item: any, columnKey: React.Key): React.ReactNode;
  onChange?: ((page: number) => void) | undefined;
  currentPage?: number | undefined;
  pages?: number | undefined;
  emptyContent: string;
  tablekey: string;
  columns: Array<{ key: string; label: string }>; 
  rows: Array<any>; 
}

export default function CommonTable(props: CommonTableProps){
  return (
    <div>
      <Table  
        aria-label={props.tablekey}
        bottomContent={
          props.pages && props.pages > 0? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={props.currentPage}
                total={props.pages ? props.pages : 0}
                onChange={props.onChange}
              />
            </div>
          ) : null
        }
        bottomContentPlacement="outside"
        >
        <TableHeader columns={props.columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody emptyContent={props.emptyContent} items={props.rows}>
          {(item: any) => (
            <TableRow key={item.key}>
             {(columnKey) => <TableCell>{props.renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
      </TableBody>
    </Table>
    </div>
  )
}

