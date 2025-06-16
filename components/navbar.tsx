import Image from "next/image";
import Link from "next/link";
import SearchBox from "./SearchBox";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <Link href="/" title="Go to homepage">
        <Image src="/logo-transparent.png" width={200} height={50} alt="logo" />
      </Link>
      <SearchBox />
    </header>
  );
}
