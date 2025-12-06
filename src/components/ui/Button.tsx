import type React from "react";
import { cn } from "../../utils/classNames";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <button
      className={cn(
        "rounded-lg text-white p-3 bg-[#222] hover:bg-[#333] transition-all cursor-pointer",
        props.className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
