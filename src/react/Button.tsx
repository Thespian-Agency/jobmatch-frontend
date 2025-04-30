import classNames from "classnames";

interface Props {
  variant?: "primary" | "secondary";
  size?: "L" | "M";
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "M",
  className,
  children,
}: Props) {
  return (
    <button
      onClick={() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }}
      className={classNames(
        "body-m font-medium  rounded-full cursor-pointer",
        {
          "py-8 px-10": size === "M",
          "py-16 px-16": size === "L",
          "bg-primary text-fg-grey-primary-white": variant === "primary",
          "bg-secondary text-fg-grey-secondary": variant === "secondary",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
