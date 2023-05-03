import { ColumnDef } from "@tanstack/react-table";
import { HTMLProps, useEffect, useRef } from "react";

export const columns: ColumnDef<any>[] = [
  {
    id: "checkbox",
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
      <div className="w-[52px] flex items-center justify-center">
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
        <span className="font-semibold text-sm text-primary" aria-hidden="true">
          {info.getValue<string>()}
        </span>
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
    <>
      <input
        type="checkbox"
        ref={ref}
        className={
          className +
          "h-5 w-5 border-1 rounded-md border-light bg-surface text-accent-primary outline-none cursor-pointer hover:border-dark hover:ring-2 hover:ring-neutral-alpha-200 transition-all duration-150 without-ring disabled:bg-neutral-alpha-100 disabled:border-disabled disabled:hover:border-disabled disabled:hover:ring-0 disabled:cursor-default"
        }
        {...rest}
      />
    </>
  );
}
