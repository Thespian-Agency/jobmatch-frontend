import classNames from "classnames";
import type { subjectOptions } from "./ContactForm";

interface Props {
  variant?: "primary" | "secondary";
  size?: "L" | "M";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  subjectOption?: (typeof subjectOptions)[number];
}

export default function Button({
  variant = "primary",
  size = "M",
  className,
  onClick,
  children,
  type = "button",
  subjectOption,
}: Props) {
  return (
    <button
      type={type}
      onClick={() => {
        if (onClick) {
          onClick();
        }
        if (subjectOption) {
          const subjectInput = document.getElementById(subjectOption);
          if (subjectInput) {
            (subjectInput as HTMLInputElement).checked = true;
          }
        }
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }}
      className={classNames(
        "select-none body-m font-regular  rounded-full cursor-pointer transition-all duration-300",
        {
          "py-8 px-10": size === "M",
          "py-16 px-16": size === "L",
          "bg-primary hover:bg-primary/90 text-fg-grey-primary-white":
            variant === "primary",
          "bg-secondary hover:bg-secondary/90 text-fg-grey-secondary":
            variant === "secondary",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
