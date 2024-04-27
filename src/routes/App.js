import "../index.css";
import { Link, Outlet } from "react-router-dom";
import RoomManagementComponent from "../components/MyHome/GraphComponent/RoomManagementComponent.js";

export default function App() {
  return (
    <>
      <nav>
        <div>
          Hello world
          <RoomManagementComponent />
          <Link to="/About">
            About
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}