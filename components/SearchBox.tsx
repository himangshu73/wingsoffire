import { FaSearch } from "react-icons/fa";

export default function SearchBox() {
  return (
    <form className="flex items-center gap-2 h-10 w-full">
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 h-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="h-full bg-blue-600 px-3 py-2 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        <FaSearch />
      </button>
    </form>
  );
}
