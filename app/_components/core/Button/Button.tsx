"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FloatProps } from "@headlessui-float/react";
import { styles } from "./Button.styles";
import clsx from "clsx";
import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";

enum ButtonGroup {
  normal = "normal",
  destructive = "destructive",
}

enum ButtonVariant {
  primary = "primary",
  secondary = "secondary",
  outlined = "outlined",
  transparent = "transparent",
  twitch = "twitch",
  riot = "riot",
}

enum ButtonSize {
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
  disabled?: boolean;
  menu?: ButtonMenu[];
  menuPlacement?: FloatProps["placement"];
  children: ReactNode;
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
  menu,
  menuPlacement,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
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
        "transition-all duration-150",
        {
          "w-full": width === ButtonWidth.full,
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
}
