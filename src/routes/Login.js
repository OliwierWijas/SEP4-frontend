import carousel1 from "../images/carousel1.jpg";
import carousel2 from "../images/carousel2.jpg";
import carousel3 from "../images/carousel3.jpg";
import Carousel from "../components/Carousel.js";
import SignUpLogin from "../components/SignUp/SignUpLoginComponent.js";
import { useLogin } from "../hooks/mocks/useLoginMock.js";

export default function Login() {
  const images = [carousel1, carousel2, carousel3];
  const smallText = "Haven't registered your house yet?"

  return (
    <>
    {/* Gotta make this smaller */}
    <Carousel images={images}></Carousel>
    <SignUpLogin textArrayToDisplay={["Welcome back", "to your smart home", "Log in now"]} emailNeeded passwordNeeded mainButtonText="Login" smallButtonText="Sign up" smallText={smallText} linkTo={"/Signup"} action={useLogin}></SignUpLogin>
    </>
  );
}
