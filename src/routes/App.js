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

  localStorage.setItem("username", "testUser")
  localStorage.setItem("password", "testPassword")
  localStorage.setItem("jwt", "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiI2MDk0ZTBjOS1hOGI3LTRkMTUtOWEyOS1mYWY4NzYyNjE2MTgiLCJpYXQiOiIwNS8xOS8yMDI0IDEyOjUzOjIyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3RVc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiTWVtYmVyIiwiSG91c2VJZCI6IiIsImV4cCI6MTcxNjEyNjgwMiwiaXNzIjoiSldUQXV0aGVudGljYXRpb25TZXJ2ZXIiLCJhdWQiOiJKV1RTZXJ2aWNlQmxhem9yV2FzbUNsaWVudCJ9.5XfU-lcqM_q-kl0d-rme4RCAXCOTo8p782DY-VFD1-cHAeYVVnSIlRzq1jLgtoVZ-SyzEGZ1a_4KvzXDYrqvgQ")

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
