"use client";

import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.log("Unexpected Error: ", error);
    }
  };
  return (
    <header className="bg-white shadow-md ">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 py-2 ">
        <Link
          href="/"
          title="Go to homepage"
          className="flex items-center flex-shrink-0"
          aria-label="Home"
        >
          <Image
            src="/logo-transparent.png"
            width={160}
            height={40}
            alt="Company Logo"
            className="hidden md:block"
            priority
          />
          <h1 className="text-xl md:hidden font-extrabold">
            <span className="text-blue-700">F</span>
            <span className="text-orange-700">S</span>
          </h1>
        </Link>
        <div className="flex-1 md:flex hidden  justify-center px-2">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className="flex-1 border border-gray-500 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search Products"
            />
            <button
              type="submit"
              aria-label="Submit Search"
              className="text-gray-600 hover:text-blue-700"
            >
              <FaSearch />
            </button>
          </form>
        </div>
        <div className="md:hidden flex flex-1 justify-center px-2">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className="flex-1 border border-gray-500 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[200px]"
              aria-label="Search Products"
            />
            <button
              type="submit"
              aria-label="Submit Search"
              className="text-gray-600 hover:text-blue-700"
            >
              <FaSearch />
            </button>
          </form>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <p>Categories</p>
          <Link href="/cart">Cart</Link>
          {status === "loading" ? null : user ? (
            <>
              <p>{user.name?.split(" ")[0]}</p>
              <p className="hover:cursor-pointer" onClick={() => signOut()}>
                Logout
              </p>
            </>
          ) : (
            <p className="hover:cursor-pointer" onClick={() => signIn()}>
              Login
            </p>
          )}
        </div>

        <button
          className="text-2xl md:hidden shrink-0"
          title="Menu"
          aria-label="Open Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>
      {menuOpen && (
        <ul className="absolute z-50 right-4 mt-2 w-40 rounded-xl shadow-lg bg-orange-200 p-3 space-y-2 text-center transition duration-300">
          <li className="hover:bg-orange-300 px-4 py-2 rounded-lg cursor-pointer">
            <Link href="/cart">Cart</Link>
          </li>

          {status === "loading" ? null : user ? (
            <>
              <li className="hover:bg-orange-300 px-4 py-2 rounded-lg cursor-pointer">
                {user.name?.split(" ")[0]}
              </li>
              <li
                className="hover:bg-orange-300 px-4 py-2 rounded-lg cursor-pointer"
                onClick={() => signOut()}
              >
                Logout
              </li>
            </>
          ) : (
            <li
              className="hover:bg-orange-300 px-4 py-2 rounded-lg cursor-pointer"
              onClick={() => signIn()}
            >
              Login
            </li>
          )}
        </ul>
      )}
    </header>
  );
}
