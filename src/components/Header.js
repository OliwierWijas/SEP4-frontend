import { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import BrownButton from "./BrownButton.js";
import BrownBreakline from "./BrownBreakline.js";

export default function Header({ setNotificationOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHouseLocked, toggleLocker] = useState(false);

  const handleLocker = () => {
    toggleLocker(!isHouseLocked);
  };

  const handleNavbarItemClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="header bg-white mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="text-base text-xl md:text-2xl lg:text-4xl xl:text-3xl text-gray-800"
                onClick={handleNavbarItemClick}
              >
                <p style={{ color: "#a79277" }}><b>Smart</b> Home</p>
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
              <FaRegBell onClick={() => setNotificationOpen(true)} className="hover:text-gray-800 text-gray-600 hover:underline" />
              <div>
                {isHouseLocked ? <IoLockClosedOutline onClick={handleLocker} /> : <IoLockOpenOutline onClick={handleLocker} />}
              </div>
              <Link to="/Login"><BrownButton
                text="Login"
                className="hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              /></Link>
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
                onClick={handleNavbarItemClick}
              >
                About
              </Link>
              <Link
                to="/MyHome"
                className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
                onClick={handleNavbarItemClick}
              >
                My Home
              </Link>
              <Link
                to="/MyProfile"
                className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
                onClick={handleNavbarItemClick}
              >
                My Profile
              </Link>
              <div
                onClick={() => setNotificationOpen(true)}
                className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                Notifications
              </div>
              <div
                onClick={() => handleLocker()}
                className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                {isHouseLocked ? "Lock House" : "Unlock"}
              </div>
              {localStorage.getItem("jwt") ? (
                <div onClick={handleNavbarItemClick}>
                  <p className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium" onClick={() => localStorage.clear()}>Logout</p>
                </div>
              ) : (
                <Link to="/Login" onClick={handleNavbarItemClick}>
                  <p className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">Login</p>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
      <BrownBreakline />
    </>
  );
}
