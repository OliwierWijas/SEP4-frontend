import "../index.css";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <nav>
        <div>
          Hello world
          <Link to="/About">
            About
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}