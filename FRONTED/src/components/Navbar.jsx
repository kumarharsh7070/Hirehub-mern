import { Link } from "react-router-dom";
import logo from "../assets/image.png";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="HireHub Logo"
            className="h-10 w-auto"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            HireHub
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8 font-medium text-gray-700">
          <li>
            <Link
              to="/"
              className="hover:text-blue-600 transition"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/jobs"
              className="hover:text-blue-600 transition"
            >
              Jobs
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className="hover:text-blue-600 transition"
            >
              Profile
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="hover:text-blue-600 transition"
            >
              Login
            </Link>
          </li>

          <li>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;