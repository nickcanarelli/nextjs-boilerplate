import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { HTMLProps, useEffect, useRef } from "react";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    id: "email1",
    header: () => "Email",
    accessorFn: (row) => row.email,
    cell: (info) => (
      <div className="flex flex-row gap-x-3 items-center shrink-0">
        <Image
          className="rounded-full "
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          width={"40"}
          height={"40"}
        />
        <div className="flex flex-col">
          <span className="sr-only">Your profile</span>
          <span
            className="font-semibold text-sm text-primary"
            aria-hidden="true"
          >
            {info.getValue<string>()}
          </span>
          <span className="text-secondary font-normal text-xs">@tom_cook</span>
        </div>
      </div>
    ),
    filterFn: "arrIncludesSome",
    enableColumnFilter: true,
  },
  {
    id: "role",
    header: () => "Role",
    accessorFn: (row) => row.role,
    cell: (info) => (
      <div className="font-medium text-secondary text-sm leading-[22px] -tracking-[0.128px] min-w-0 truncate pr-2">
        {info.getValue<string>()}
      </div>
    ),
    filterFn: "arrIncludesSome",
    enableColumnFilter: true,
  },
  {
    id: "email",
    header: () => "Email",
    accessorFn: (row) => row.email,
    cell: (info) => (
      <div className="font-medium text-secondary text-sm leading-[22px] -tracking-[0.128px] min-w-0 truncate pr-2">
        {info.getValue<string>()}
      </div>
    ),
    filterFn: "arrIncludesSome",
    enableColumnFilter: true,
  },
  {
    id: "createdAt",
    header: () => "Date Joined",
    accessorFn: (row) => row.createdAt,
    cell: (info) => (
      <div className="font-medium text-secondary text-sm leading-[22px] -tracking-[0.128px] min-w-0 truncate pr-2">
        {info.getValue<string>()}
      </div>
    ),
    filterFn: "arrIncludesSome",
    enableColumnFilter: true,
  },
];

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}
