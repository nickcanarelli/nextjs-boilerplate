import { HTMLAttributes } from "react";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

export default function Divider({ text }: DividerProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-divider" />
      </div>
      <div className="relative flex justify-center text-sm font-medium leading-[22px] tracking-[-0.128px]">
        <span className="bg-surface px-4 text-secondary">{text}</span>
      </div>
    </div>
  );
}
