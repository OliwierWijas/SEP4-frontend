import { Link } from "react-router-dom"
import TextBox from "../components/SignUp/TextBoxComponent.js"
import SignUpLogin from "../components/SignUp/SignUpLoginComponent.js";

function SignUp() {
    const textArray1 = [
        "Keep tabs on your house's temperature, humidity, and light levels from anywhere, ensuring optimal living conditions at all times.",
        "With real-time monitoring, you'll always know whether your home is maintaining the perfect atmosphere for comfort and well-being."
    ];

    const textArray2 = [
        "Take control of your home's comfort with our remote control features.",
        "Adjust your radiator and open/close windows remotely to effortlessly maintain the ideal temperature and humidity levels, no matter where you are."
    ];

    const textArray3 = [
        "Rest easy knowing your home is secure with our enhanced security features.",
        "Lock and unlock your doors remotely with password protection, and receive instant alerts if there's any unauthorized access attempt, ensuring your peace of mind at all times."
    ];

    const textArray4 = [
        "Create your own personalized account to centralize all property information, and invite family members or housemates to share access seamlessly.",
        "Our customizable settings allow you to tailor your home environment to your preferences, ensuring the perfect ambiance every time."
    ];

    const textArray5 = [
        "Tailor your home environment to your preferences by adjusting light levels remotely and ensuring the perfect ambiance every time.",
    ];

    const textArray6 = [
        "Dive deep into sensor data history for insightful consumption analysis and informed decision-making.",
        "Our intuitive data visualization tools empower you to understand your home's patterns and optimize your living space efficiently."
    ];

    const textArray7 = [
        "Easily manage your account with options to edit your credentials and delete your account if needed, ensuring your information is always up-to-date and your privacy is respected.",
    ];

    const textArray8 = [
        "Stay informed with proactive notifications when your home conditions deviate from default settings, giving you peace of mind wherever you are.",
    ];

    const loginTextArray = [
        "Smart Home", "Smart Living", "Join Now"
    ]

    const mark = "* In order to sign up, a bought set of house hardware is required."
    const smallText = "Already have an account?"

    return (
        <div className="flex items-center flex-col">
            <div style={{ border: "2px solid #C4B097" }} className="rounded-md mx-2 my-4 p-2 text-lg text-center expand w-full shadow-sm">
                <p className="my-1">Unlock the full potential of your property with our comprehensive suite of smart home solutions.</p>
                <p className="my-1">Sign up today to experience seamless control and monitoring of your home's environment like never before.</p>
            </div>
            <h style={{ color: "#C4B097" }} className="text-6xl text-center font-bold mt-8 mb-10">Your way to be smart</h>
            <div className="flex flex-wrap justify-evenly">
                <TextBox title="Real-Time Monitoring" textArray={textArray1} />
                <TextBox title="Remote Control" textArray={textArray2} />
                <TextBox title="Enhanced Security" textArray={textArray3} />
                <TextBox title="Personalized Accounts" textArray={textArray4} />
                <TextBox title="Customizable Settings" textArray={textArray5} />
                <TextBox title="Data Visualization" textArray={textArray6} />
                <TextBox title="Account Management" textArray={textArray7} />
                <TextBox title="Proactive Notifications" textArray={textArray8} />
            </div>
            <h style={{ color: "#C4B097" }} className="text-2xl text-center font-bold mt-8 ">Join our community of smart homeowners today and take control of your living space like never before</h>
            <h style={{ color: "#C4B097" }} className="text-4xl text-center font-bold mt-8">Sign up now!</h>
            <SignUpLogin textArrayToDisplay={loginTextArray} emailNeeded passwordNeeded repeatPasswordNeeded houseIdNeeded mainButtonText="Sign Up" mark={mark} smallText={smallText} smallButtonText="Login" />
        </div>
    )
}

export default SignUp