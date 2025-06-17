import Image from "next/image";
import Link from "next/link";
import SearchBox from "./SearchBox";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between gap-2 py-2">
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
            <span className="text-blue-700">Fire</span>
            <span className="text-orange-700">Shop</span>
          </h1>
        </Link>
        <div className="flex-1 max-w-xs sm:max-w-sm px-4">
          <SearchBox />
        </div>

        <button className="text-2xl md:hidden ml-2" title="Menu">
          <GiHamburgerMenu />
        </button>
      </div>
    </header>
  );
}
