"use client";

import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
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
        <p className="hidden">Cart</p>
        <p className="hidden">Login</p>

        <button
          className="text-2xl md:hidden shrink-0"
          title="Menu"
          aria-label="Open Menu"
        >
          <GiHamburgerMenu />
        </button>
      </div>
    </header>
  );
}
