import { Link, Outlet } from "react-router-dom";
import BrownButton from "./BrownButton.js";


export default function Header(){
    return (
        <>
          <nav> 
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link to="/" style={{ color: "#A79277" }} className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"><b>Smart</b> Home</Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="md:flex items-center space-x-4">
                  <Link to="/About" className="hover:black">About</Link>
                  <Link to="/MyHome" className="hover:black">My Home</Link>
                  <Link to="/MyProfile" className="hover:black">My Profile</Link>
                  </div>
                <BrownButton text="Log out" className=" hover:bg-blue-600 text-white font-bold py-4 px-8 rounded" />
              </div>
            </div>
          </nav>
          <Outlet />
        </>
      );
}

