import reactLogo from "../../public/assets/Logo_BrickMorty.png";

export type HeaderProps = {
    title: string;
};

export const Header = ({ title }: HeaderProps) => {
    return (
        <div className="flex flex-col items-center mb-4">
            <img
                src={reactLogo}
                alt="Logo"
                className="lego-logo"
                style={{
                    width: "80px",
                    height: "auto",
                    maxHeight: "80px",
                }}
            />
            <h1 className="text-3xl font-lego text-yellow-500 mt-2">{title}</h1>
        </div>
    );
};
