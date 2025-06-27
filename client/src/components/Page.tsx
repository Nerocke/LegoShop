import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { useLocation } from "react-router-dom";

type PageProps = {
    title: string;
    children: ReactNode;
    hideNavbar?: boolean;
};

export const Page = ({ title, children, hideNavbar }: PageProps) => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <main>
            <Header title={title} />
            {!isHomePage && !hideNavbar && <Navbar />}
            <div className="p-4">{children}</div>
        </main>
    );
};
