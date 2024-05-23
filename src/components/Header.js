import { useState, useContext } from "react";
import { FaRegBell } from "react-icons/fa";
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import BrownButton from "./BrownButton.js";
import BrownBreakline from "./BrownBreakline.js";
import { useLockState } from "../hooks/home/useLockState.js";
import { AuthContext } from "../auth/AuthContext.js";

export default function Header({ setNotificationOpen, setLockerOpen }) {
  const navigate = useNavigate()
  const { claims, setClaims } = useContext(AuthContext)
  const houseId = claims?.houseId
  const token = claims?.token

  const getLockState = useLockState();
  const currentState = getLockState(houseId, token);
  const [isOpen, setIsOpen] = useState(false);
  const [isHouseLocked, toggleLocker] = useState(currentState);

  const handleLocker = () => {
    toggleLocker(!isHouseLocked);
    setLockerOpen(true);
  };

  const handleNavbarItemClick = () => {
    setIsOpen(false);
  };

  const logOut = () => {
    setClaims(null)
    navigate("/")
  }

  let isAuthenticated = Boolean(claims?.token);

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
                <p style={{ color: "#a79277" }}>
                  <b>Smart</b> Home
                </p>
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4">
              {isAuthenticated && (
                <>
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
                  <FaRegBell
                    onClick={() => setNotificationOpen(true)}
                    className="hover:text-gray-800 text-gray-600 hover:underline"
                  />
                  <div>
                    {isHouseLocked ? (
                      <IoLockClosedOutline onClick={handleLocker} />
                    ) : (
                      <IoLockOpenOutline onClick={handleLocker} />
                    )}
                  </div>
                </>
              )}
              {isAuthenticated ? (
                <Link to="/">
                  <BrownButton
                    text="Log out"
                    className="hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={logOut}
                  />
                </Link>
              ) : (
                <Link to="/Login">
                  <BrownButton
                    text="Login"
                    className="hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  />
                </Link>
              )}
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
                    d={
                      isOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isAuthenticated && (
                <>
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
                    {isHouseLocked ? "Lock Home" : "Unlock Home"}
                  </div>
                </>
              )}
              {isAuthenticated ? (
                <Link to="/" onClick={() => {handleNavbarItemClick(); logOut()}}>
                  <p className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
                    Log out
                  </p>
                </Link>
              ) : (
                <Link to="/Login" onClick={handleNavbarItemClick}>
                  <p className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
                    Login
                  </p>
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
