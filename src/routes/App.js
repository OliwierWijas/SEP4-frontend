import "../index.css";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <nav>
        <div>
            <Link to="/About">
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}