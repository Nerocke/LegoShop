import { ReactNode } from "react";
import classNames from "classnames";

type CardProps = {
    children: ReactNode;
    className?: string;
};

export function Card({ children, className }: CardProps) {
    return (
        <div className={classNames("bg-white rounded-2xl shadow-md overflow-hidden", className)}>
            {children}
        </div>
    );
}

type CardContentProps = {
    children: ReactNode;
    className?: string;
};

export function CardContent({ children, className }: CardContentProps) {
    return <div className={classNames("p-4", className)}>{children}</div>;
}
