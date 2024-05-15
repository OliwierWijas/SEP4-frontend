import BrownButton from "../components/BrownButton.js";
import imageFile from "../images/homepage1.png"
import videoFile from "../images/homepage2.mp4"
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1 className="flex justify-center text-2xl md:text-3xl lg:text-4xl mt-10 md:mt-16 mb-10">Smart living starts here . . .</h1>
      <Link to="/Signup"><div className="flex justify-center"><BrownButton text={"Start now"} /></div></Link>
      <div className="flex mt-10 mb-20">
        <div className="w-1/2 lg:w-1/3 mr-5 lg:mr-10 mx-auto photo">
          <img src={imageFile} alt="Your Alt Text" />
          <div className="md:text-justify mt-5 text-xs md:text-sm lg:text-lg"><b>Smart Home</b> - Redefining modern living with intuitive technology and uncompromising quality.</div>
        </div>
        <div className="w-1/2 lg:w-1/3 ml-5 lg:ml-10 mx-auto video">
          <video autoPlay loop muted>
            <source src={videoFile} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="flex justify-center text-xs md:text-base lg:text-lg mx-auto">
        <div className="w-1/5 lg:w-1/6 flex text-center justify-center">
          <b>WHAT WE BELIEVE</b>
        </div>
        <div className="w-4/5 lg:w-2/3 text-justify">
          <p>Discover the forefront of modern living with our pioneering smart home solutions. </p>
          <p className="mt-5">We redefine the concept of home through innovative technology and intuitive design.</p>
          <p className="my-5">Our mission is to empower individuals to effortlessly manage their living spaces, ensuring comfort, security, and efficiency at every touchpoint. With a dedication to excellence and a commitment to pushing the boundaries of possibility, we lead the way in revolutionizing how we interact with our environments. Welcome to the future of living, where convenience meets sophistication, and where your home becomes an extension of your lifestyle.</p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
