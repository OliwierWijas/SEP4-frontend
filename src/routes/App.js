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
  localStorage.setItem("jwt", "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiI2YWQ3MjkxOC0wMTgzLTQxYjItOTVmNS00YTVhMGY5NjhiOTUiLCJpYXQiOiIwNS8yMS8yMDI0IDExOjQyOjMwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3RVc2VyNzAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJNZW1iZXIiLCJIb3VzZUlkIjoiIiwiZXhwIjoxNzE2Mjk1MzUwLCJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IkpXVFNlcnZpY2VCbGF6b3JXYXNtQ2xpZW50In0.OzA9x7C3zqNiz24zZuMmoiGjQpuP55_4oay6OeyyUsdp04oWi5zish79qWBVeYeZQFAhh5VdJP3YO7HioZzjEQ")

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
