export const styles = {
  sm: [
    "rounded-md",
    "p-2.5",
    "text-[13px]",
    "font-semibold",
    "leading-3",
    "tracking-[-0.04px]",
  ].join(" "),
  md: [
    "rounded-md",
    "py-3",
    "px-3.5",
    "text-sm",
    "font-semibold",
    "leading-4",
    "tracking-[-0.128px]",
  ].join(" "),
  lg: [
    "rounded-md",
    "py-3",
    "px-5",
    "text-base",
    "font-semibold",
    "leading-6",
    "tracking-[-0.18px]",
  ].join(" "),
  normal: {
    wrapper: [
      "flex",
      "items-center",
      "justify-center",
      "gap-x-2",
      "text-center",
      "cursor-pointer",
      "ring-2",
      "ring-transparent",
      "active:ring-2",
      "active:ring-blue-alpha-200",
      "disabled:bg-grey-alpha-100",
      "disabled:text-disabled",
      "disabled:ring-2",
      "disabled:ring-transparent",
      "disabled:cursor-default",
    ].join(" "),
    primary: [
      "bg-accent-primary",
      "text-accent-contrast",
      "hover:bg-accent-light",
    ].join(" "),
    secondary: [
      "bg-neutral-alpha-200",
      "text-primary",
      "hover:bg-neutral-alpha-400",
    ].join(" "),
    outlined: [
      "bg-surface",
      "text-primary",
      "border",
      "border-light",
      "hover:border-dark",
      "disabled:border-disabled",
    ].join(" "),
    transparent: [
      "text-secondary",
      "bg-transparent",
      "hover:bg-neutral-alpha-200",
      "hover:text-primary",
      "active:bg-surface",
      "disabled:bg-transparent",
    ].join(" "),
    twitch: [
      "bg-twitch-primary",
      "text-accent-contrast",
      "hover:bg-twitch-medium",
      "active:ring-purple-600/30",
    ].join(" "),
    riot: [
      "bg-riot-primary",
      "text-accent-contrast",
      "hover:bg-error-medium",
    ].join(" "),
  },
  destructive: {
    wrapper: [
      "flex",
      "items-center",
      "justify-center",
      "gap-x-2",
      "text-center",
      "cursor-pointer",
      "ring-2",
      "ring-transparent",
      "active:ring-2",
      "active:ring-red-alpha-200",
      "disabled:bg-grey-alpha-100",
      "disabled:text-disabled",
      "disabled:ring-2",
      "disabled:ring-transparent",
      "disabled:cursor-default",
    ].join(" "),
    primary: [
      "bg-error-primary",
      "text-accent-contrast",
      "hover:bg-error-medium",
    ].join(" "),
    secondary: [
      "bg-neutral-alpha-200",
      "text-error-primary",
      "hover:bg-neutral-alpha-400",
    ].join(" "),
    outlined: [
      "bg-surface",
      "text-error-primary",
      "border",
      "border-light",
      "hover:border-dark",
      "disabled:border-disabled",
    ].join(" "),
    transparent: [
      "text-error-primary",
      "bg-transparent",
      "hover:bg-neutral-alpha-200",
      "active:bg-surface",
      "disabled:bg-transparent",
    ].join(" "),
    twitch: [
      "bg-twitch-primary",
      "text-accent-contrast",
      "hover:bg-twitch-medium",
      "active:ring-purple-600/30",
    ].join(" "),
    riot: [
      "bg-riot-primary",
      "text-accent-contrast",
      "hover:bg-error-medium",
    ].join(" "),
  },
};