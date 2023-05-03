"use client";
import React, { Fragment, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  FilterFn,
  getFacetedRowModel,
  getFacetedUniqueValues,
  ColumnFiltersState,
  flexRender,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { columns } from "./columns";
import clsx from "clsx";
import { useGetAllUsers } from "@api/admin/getAllUsers";

// default table filtering fn
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export default function UsersTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: users } = useGetAllUsers();

  console.log("users: ", users);

  const table = useReactTable({
    data: users,
    columns: columns,
    enableFilters: true,
    enableColumnFilters: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    initialState: {
      pagination: { pageSize: 25 },
      sorting: [{ id: "createdAt", desc: true }],
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    debugTable: process.env.NODE_ENV === "development",
  });
  return (
    <div className="bg-surface rounded-lg overflow-hidden border border-light w-full">
      <div className="py-5 px-6 bg-surface">
        <div className="flex flex-col">
          <span className="text-primary font-semibold text-lg leading-[28px] tracking-[-0.256px]">
            Users
          </span>
          <span className="text-secondary text-sm leading-[22px] tracking-[-0.128px]">
            Manage your users
          </span>
        </div>
      </div>
      {users ? (
        <table
          className={clsx(
            "bg-light w-full relative flex flex-row flex-no-wrap sm:inline-table table-fixed"
          )}
        >
          <thead>
            {table?.getHeaderGroups().map((headerGroup: any) => (
              <tr
                key={headerGroup.id}
                className="flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0 sm:w-[75px] mb-1"
              >
                {headerGroup.headers.map((header: any, headerIdx: number) => {
                  const isFirstCell = headerIdx === 0;
                  const isCheckbox = header.id === "checkbox";

                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                      className={clsx(
                        "border-y border-light py-2.5 text-sm font-semibold leading-[22px] -tracking-[0.128px] text-primary px-4",
                        {
                          "w-[52px]": isCheckbox,
                        }
                      )}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex gap-x-1 items-center ">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="w-full px-4 flex-1">
            {table?.getRowModel()?.rows.map((row: any) => {
              const isSelected = row.getIsSelected();
              return (
                <Fragment key={row.id}>
                  <tr
                    className={clsx(
                      "hover:bg-light flex flex-col flex-no wrap table-row transition-all duration-200",
                      {
                        "bg-light": isSelected,
                        "bg-surface": !isSelected,
                      }
                    )}
                  >
                    {row.getVisibleCells().map((cell: any, cellIdx: number) => {
                      const isFirstCell = cellIdx === 0;
                      const isCheckbox = cell.column.id === "checkbox";

                      return (
                        <td
                          key={cell.id}
                          className={clsx("h-[48px]", {
                            "pl-4": !isFirstCell,
                            "w-[52px]": isCheckbox,
                          })}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}
