"use client";

import { ButtonHTMLAttributes } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FloatProps } from "@headlessui-float/react";
import { styles } from "./IconButton.styles";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

enum ButtonGroup {
  normal = "normal",
}

enum ButtonVariant {
  primary = "primary",
  secondary = "secondary",
  outlined = "outlined",
  "primary-transparent" = "primary-transparent",
  "secondary-transparent" = "secondary-transparent",
}

enum ButtonSize {
  tiny = "tiny",
  sm = "sm",
  md = "md",
  lg = "lg",
}

enum ButtonWidth {
  full = "full",
  auto = "auto",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  group: keyof typeof ButtonGroup;
  variant: keyof typeof ButtonVariant;
  size: keyof typeof ButtonSize;
  width?: keyof typeof ButtonWidth;
  icon: IconProp;
  disabled?: boolean;
  className?: string;
  menu?: ButtonMenu[];
  menuPlacement?: FloatProps["placement"];
}

interface ButtonMenu {
  text: string;
  icon: IconProp;
  onClick: () => void;
}

export default function Button({
  group,
  variant,
  size,
  width = "auto",
  icon,
  className,
  menu,
  menuPlacement,
  ...props
}: ButtonProps) {
  const btnSize = styles[size];
  const btnWrapper = styles[group].wrapper;
  const btnVariant = styles[group][variant];

  const hasMenu = menu && menu.length > 0;

  return hasMenu ? (
    <>test</>
  ) : (
    <button
      className={clsx(
        btnSize,
        btnWrapper,
        btnVariant,
        className,
        "transition-all duration-150",
        {
          "w-full": width === ButtonWidth.full,
        }
      )}
      {...props}
    >
      <FontAwesomeIcon icon={icon} aria-hidden="true" />
    </button>
  );
}
