import "../index.css";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import BrownBreakline from "../components/BrownBreakline.js";

export default function App() {
  return (
    <>
      <div className="py-4 w-4/5 mx-auto">
        <Header></Header>
        <BrownBreakline/>
        <Footer></Footer>
      </div>
    </>
  );
}
