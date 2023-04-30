"use client";

import { faLock, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormNotFound from "../_FormNotFound/FormNotFound";
import FieldError from "../_FieldError/FieldError";
import PasswordStength from "./PasswordStrength";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";

interface PasswordProps {
  id: string;
  label: string;
  placeholder?: string;
  icon?: boolean;
  showStrength?: boolean;
  disabled?: boolean;
}

export default function Password({
  id,
  label,
  placeholder,
  icon,
  disabled = false,
  showStrength = false,
}: PasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useFormContext();

  if (!form) {
    return <FormNotFound field="Password" />;
  }

  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const error = errors[id];
  const password = watch(id);

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={clsx("block text-sm font-bold", {
          "text-primary": !disabled,
          "text-disabled": disabled,
        })}
      >
        {label}
      </label>
      <div
        className={clsx(
          "group mt-2.5 flex items-center rounded-lg px-3 py-2.5 ring-1 ring-inset transition-all duration-150 focus-within:ring-1",
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
          type={showPassword ? "text" : "password"}
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
            icon={faLock}
            aria-hidden="true"
            className={clsx(
              "order-1 mr-3 h-4 w-4 transition-all duration-150",
              {
                "text-disabled placeholder:text-disabled": disabled,
                "text-secondary group-hover:text-primary peer-focus:text-primary ":
                  !disabled,
              }
            )}
          />
        ) : null}
        <div
          className={clsx(
            "order-3 ml-3 cursor-pointer transition-all duration-150",
            {
              "text-disabled placeholder:text-disabled": disabled,
              "text-secondary group-hover:text-primary peer-focus:text-primary ":
                !disabled,
            }
          )}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <FontAwesomeIcon
              icon={faEyeSlash}
              aria-hidden="true"
              className="h-4 w-4"
            />
          ) : (
            <FontAwesomeIcon
              icon={faEye}
              aria-hidden="true"
              className="h-4 w-4"
            />
          )}
        </div>
      </div>
      {showStrength ? <PasswordStength password={password} /> : null}

      <FieldError error={error} />
    </div>
  );
}
