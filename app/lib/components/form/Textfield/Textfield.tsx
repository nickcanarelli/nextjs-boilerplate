"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import FormNotFound from "../_FormNotFound/FormNotFound";
import FieldError from "../_FieldError/FieldError";
import { useFormContext } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  placeholder?: string;
  icon?: IconProp;
  type?: string;
  disabled?: boolean;
  hint?: string;
}

export default function Textfield({
  id,
  label,
  placeholder,
  icon,
  type = "text",
  disabled = false,
  hint,
  ...props
}: TextfieldProps) {
  const form = useFormContext();

  if (!form) {
    return <FormNotFound field="Textfield" />;
  }

  const {
    register,
    formState: { errors },
  } = form;

  const error = errors[id];

  return (
    <div className="w-full">
      <label htmlFor={id} className="flex">
        <div
          className={clsx("flex-1 text-sm font-bold", {
            "text-primary": !disabled,
            "text-disabled": disabled,
          })}
        >
          {label}
        </div>
        <div className="leading-4.5 text-xs font-normal tracking-[0.016px] text-secondary">
          {!props.required ? "Optional" : null}
        </div>
      </label>
      <div
        className={clsx(
          "group mt-2.5 flex items-center rounded-lg px-3 py-2.5 ring-1 ring-inset transition-all duration-150 focus-within:ring-1 ",
          {
            "ring-border-light": !disabled,
            "bg-border-disabled ring-border-disabled": disabled,
            "focus-within:shadow-input-focus focus-within:ring-accent-primary":
              !error,
            "shadow-input-error ring-error-primary": error,
          }
        )}
      >
        <input
          id={id}
          type={type}
          disabled={disabled}
          placeholder={placeholder || label}
          className={clsx(
            "peer order-2 w-full border-0 bg-transparent p-0 text-sm font-medium leading-[22px] outline-none ring-0 transition-all duration-150",
            {
              "text-disabled placeholder:text-disabled": disabled,
              "text-primary placeholder:text-secondary group-hover:placeholder:text-primary":
                !disabled,
            }
          )}
          {...register(id)}
        />
        {icon ? (
          <FontAwesomeIcon
            icon={icon}
            aria-hidden="true"
            className={clsx("order-1 mr-3 transition-all duration-150", {
              "text-disabled placeholder:text-disabled": disabled,
              "text-secondary group-hover:text-primary peer-focus:text-primary ":
                !disabled,
            })}
          />
        ) : null}
      </div>

      <FieldError hint={hint} error={error} />
    </div>
  );
}
