import "../index.css";
import { useState } from "react"
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { Outlet } from "react-router-dom";
import PopUp from "../components/PopUp.js";
import NotificationBoxComponent from "../components/MyProfile/NotificationBoxComponent.js";
import LockerPopUp from "../components/LockerPopUp.js";

export default function App() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [lockerOpen, setLockerOpen] = useState(false)

  return (
    <>
      <div className="w-4/5 mx-auto min-h-screen flex flex-col">
        <div className="justify-start"><Header setNotificationOpen={setNotificationOpen} setLockerOpen={setLockerOpen}></Header></div>
        <PopUp isOpen={notificationOpen} setIsOpen={setNotificationOpen}>
          <NotificationBoxComponent />
        </PopUp>
        <PopUp isOpen={lockerOpen} setIsOpen={setLockerOpen}>
          <LockerPopUp></LockerPopUp>
        </PopUp>
        <div className="flex-1"><Outlet /></div>
        <div className="justify-end"><Footer></Footer></div>
      </div>
    </>
  );
}
