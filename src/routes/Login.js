import carousel1 from "../images/carousel1.jpg";
import carousel2 from "../images/carousel2.jpg";
import carousel3 from "../images/carousel3.jpg";
import Carousel from "../components/Carousel.js";
import SignUpLogin from "../components/SignUp/SignUpLoginComponent.js";
import { useLogin } from "../hooks/auth/useLogin.js";
import { useContext } from "react"
import { AuthContext } from "../auth/AuthContext.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const images = [carousel1, carousel2, carousel3];
  const smallText = "Haven't registered your house yet?"
  const login = useLogin()
  const { setClaims } = useContext(AuthContext)

  const handleLogin = async (username, password) => {
    const bool = await login(username, password)
    setClaims(null)
    if (bool) {
      const claims = JSON.parse(localStorage.getItem("claims"))
      setClaims(claims)
      navigate("/MyHome")
    }
  }

  return (
    <>
      <Carousel images={images}></Carousel>
      <SignUpLogin textArrayToDisplay={["Welcome back", "to your smart home", "Log in now"]} usernameNeeded passwordNeeded mainButtonText="Login" smallButtonText="Sign up" smallText={smallText} action={handleLogin} linkTo={"/Signup"}></SignUpLogin>
    </>
  );
}
