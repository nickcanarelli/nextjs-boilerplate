"use client";

import { useMemo } from "react";
import clsx from "clsx";

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const initPwdChecker = useMemo(() => {
    let pwdCheck = 0;
    const validateRegex = [
      ".{8,}", // min 8 chars
      "[A-Z]", // uppercase
      "[a-z]", // lowercase
      "[0-9]", // numeric
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/, // special char
    ];
    if (!password?.length) {
      return null;
    }
    validateRegex.forEach((regex, i) => {
      if (new RegExp(regex).test(password)) {
        pwdCheck += 1;
      }
    });
    switch (pwdCheck) {
      case 0:
        return {
          strength: 0,
          val: "bg-accent-primary",
        };
      case 1:
        return {
          strength: 25,
          val: "bg-error-primary",
        };
      case 2:
        return {
          strength: 50,
          val: "bg-error-primary",
        };
      case 3:
        return {
          strength: 50,
          val: "bg-warning-primary",
        };
      case 4:
        return {
          strength: 75,
          val: "bg-warning-primary",
        };
      case 5:
        return {
          strength: 100,
          val: "bg-success-primary",
        };
      default:
        return null;
    }
  }, [password]);

  return (
    <div>
      <div className="relative mt-2.5">
        <div className="flex h-1.5 overflow-hidden rounded bg-neutral-alpha-200 text-xs">
          <div
            style={{ width: `${initPwdChecker?.strength}%` }}
            className={clsx(
              "flex flex-col justify-center whitespace-nowrap text-center text-white shadow-none transition-all duration-150",
              initPwdChecker?.val
            )}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
