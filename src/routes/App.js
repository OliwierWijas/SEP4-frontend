import "../index.css";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <div className="w-4/5 mx-auto min-h-screen flex flex-col">
        <div className="justify-start"><Header></Header></div>
        <div className="flex-1"><Outlet /></div>
        <div className="justify-end"><Footer></Footer></div>
      </div>
    </>
  );
}
