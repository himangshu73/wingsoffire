import Image from "next/image";
import Link from "next/link";
import SearchBox from "./SearchBox";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <Link
        href="/"
        title="Go to homepage"
        className="flex items-center min-w-[50px]"
      >
        <Image
          src="/logo-transparent.png"
          width={160}
          height={40}
          alt="logo"
          className="hidden md:block"
        />
        <h1 className="text-2xl md:hidden font-extrabold">
          <span className="text-blue-700">F</span>
          <span className="text-orange-700">S</span>
        </h1>
      </Link>
      <div className="flex-1 px-4">
        <SearchBox />
      </div>

      <button className="text-2xl md:hidden" title="Menu">
        <GiHamburgerMenu />
      </button>
    </header>
  );
}
