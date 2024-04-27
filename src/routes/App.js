import "../index.css";
import RoomManagementComponent from "../components/MyHome/GraphComponent/RoomManagementComponent.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import BrownBreakline from "../components/BrownBreakline.js";

export default function App() {
  return (
    <>
    <div className="py-4 px-20">
      <Header></Header>
    </div>
    <RoomManagementComponent />
      <BrownBreakline></BrownBreakline>
      <div className="py-4 px-20">
      <Footer></Footer>
    </div>
    </>
  );
}