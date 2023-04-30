import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { Transition } from "@headlessui/react";
import clsx from "clsx";

interface InputErrorProps {
  hint?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export default function InputError({ hint, error }: InputErrorProps) {
  return (
    <Transition
      show={!!(hint || error)}
      enter="transition ease duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={clsx(
          "z-0 mt-2.5 text-xs leading-[18px] tracking-[0.016px]",
          {
            "text-secondary": !error,
            "text-error-primary": error,
          }
        )}
      >
        {error ? String(error.message) : hint}
      </div>
    </Transition>
  );
}
