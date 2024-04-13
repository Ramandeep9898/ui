import clsxm from "../../utils/clsxm";

interface ButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "disabled" | "outline";
  disabled?: boolean;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset";
}

const Button = ({
  children,
  variant,
  disabled,
  className,
  id,
  type,
  ...rest
}: ButtonProps) => {
  return (
    <button
      id={id}
      className={clsxm(
        "text-white rounded-full  font-bold flex justify-center items-center gap-2",
        {
          "bg-white border text-[#333]": variant === "outline",
          "bg-[#333] rounded-md px-2 py-1": variant === "primary",
          "bg-darkBlue text-white": variant === "tertiary",
          "bg-darkGrey text-white border-0": disabled,
        },
        className
      )}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
