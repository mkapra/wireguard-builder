import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-500 w-64 space-y-6 px-4 min-h-screen">
      {/* logo */}
      <a href="#" className="mt-5 flex items-center text-blue-100 space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <span className="text-2xl font-extrabold">Wireguard Builder</span>
      </a>

      <nav className="flex flex-col text-blue-100 ">
        <Link
          to="/"
          className="py-2 px-4 transition delay-75 hover:bg-orange-400 hover:text-gray-800 rounded"
        >
          Home
        </Link>
        <Link
          to="/keypairs"
          className="py-2 px-4 transition delay-75 hover:bg-orange-400 hover:text-blue-800 rounded"
        >
          Keypairs
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
