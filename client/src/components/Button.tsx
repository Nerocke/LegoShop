import { ReactNode, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    className?: string;
};

export function Button({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            className={classNames(
                "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
}
