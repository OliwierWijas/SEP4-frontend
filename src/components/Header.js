import { useState, useContext } from "react";
import { FaRegBell } from "react-icons/fa";
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import BrownButton from "./BrownButton.js";
import BrownBreakline from "./BrownBreakline.js";
import { AuthContext } from "../auth/AuthContext.js";
import { wait } from "@testing-library/user-event/dist/utils/index.js";
import { waitFor } from "@testing-library/react";

export default function Header({ setNotificationOpen, setLockerOpen }) {
  const navigate = useNavigate()
  const { claims, setClaims, isHouseLocked } = useContext(AuthContext)
  const isAuthenticated = Boolean(claims?.token);

  const [isOpen, setIsOpen] = useState(false);

  const handleLocker = () => {
    setLockerOpen(true);
  };

  const handleNavbarItemClick = () => {
    setIsOpen(false);
  };

  const logOut = async () => {
    localStorage.removeItem("claims")
    setClaims(() => {localStorage.clear(); return null})
    navigate("/")
  }

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
              <RxHamburgerMenu onClick={() => setIsOpen(!isOpen)} />
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
                    className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                  >
                    Notifications
                  </div>
                  <div
                    onClick={() => handleLocker()}
                    className="hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                  >
                    {isHouseLocked ? "Lock Home" : "Unlock Home"}
                  </div>
                </>
              )}
              {isAuthenticated ? (
                <Link to="/" onClick={() => { handleNavbarItemClick(); logOut() }}>
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
