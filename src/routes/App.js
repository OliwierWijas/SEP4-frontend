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

  localStorage.setItem("jwt", "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiI2OTA4OGFhZC0zM2Y4LTQxOGQtOWM5ZS1iZjVmNDY1MjMxNGYiLCJpYXQiOiIwNS8xOS8yMDI0IDEwOjA3OjIyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3RVc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiTWVtYmVyIiwiSG91c2VJZCI6IiIsImV4cCI6MTcxNjExNjg0MiwiaXNzIjoiSldUQXV0aGVudGljYXRpb25TZXJ2ZXIiLCJhdWQiOiJKV1RTZXJ2aWNlQmxhem9yV2FzbUNsaWVudCJ9.XQmWl6sW2PemVOqjbZHm0a95We35B-5zt72fxQ-_JmZIpYeG8wTgCMg9xEKFsGZE4zfuFN17qh7xJ_wqAP17eg")

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
