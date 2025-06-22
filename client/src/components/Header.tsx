import reactLogo from "../assets/Logo_BrickMorty.png";
import {Navbar} from "./Navbar.tsx";

export type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <div>
          <Navbar />

          <a>
          <img src={reactLogo} className="logo react" alt="React logo" />

          </a>
      </div>
      <h1>{title}</h1>
    </>
  );
};
