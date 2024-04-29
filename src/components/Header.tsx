import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import BrownButton from "./BrownButton.js";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-800"
              >
                <b style={{color: "#a79277"}}>Smart</b> Home
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link
                to="/About"
                className="hover:text-gray-800 text-gray-600 hover:underline"
              >
                About
              </Link>
              <Link
                to="/MyHome"
                className="hover:text-gray-800 text-gray-600 hover:underline"
              >
                My Home
              </Link>
              <Link
                to="/MyProfile"
                className="hover:text-gray-800 text-gray-600 hover:underline"
              >
                My Profile
              </Link>
              <BrownButton
                text="Log out"
              />
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-800 hover:text-gray-900 inline-flex items-center justify-center p-2 rounded-md focus:outline-none ml-2"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/About"
                className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
              <Link
                to="/MyHome"
                className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                My Home
              </Link>
              <Link
                to="/MyProfile"
                className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                My Profile
              </Link>
              <p className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"> This needs to become a logout function </p>
            </div>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
}
