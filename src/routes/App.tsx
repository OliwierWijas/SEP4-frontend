import "../index.css";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

export default function App() {
  return (
    <>
      <div className="py-4 px-20">
        <Header></Header>
      </div>
      <div className="py-4 px-20">
        <Footer></Footer>
      </div>
    </>
  );
}
