import Image from "next/image";
import Link from "next/link";
import SearchBox from "./SearchBox";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md ">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 py-2 ">
        <Link
          href="/"
          title="Go to homepage"
          className="flex items-center flex-shrink-0"
        >
          <Image
            src="/logo-transparent.png"
            width={160}
            height={40}
            alt="logo"
            className="hidden md:block"
          />
          <h1 className="text-xl md:hidden font-extrabold">
            <span className="text-blue-700">F</span>
            <span className="text-orange-700">S</span>
          </h1>
        </Link>
        <div className="flex-1 md:flex hidden  justify-center px-2">
          <SearchBox />
        </div>
        <div className="md:hidden flex flex-1 justify-center px-2">
          <form className="flex items-center gap-2">
            <input type="text" placeholder="Search..." className="flex-1 border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>

        <button className="text-2xl md:hidden shrink-0" title="Menu">
          <GiHamburgerMenu />
        </button>
      </div>
    </header>
  );
}
