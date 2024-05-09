import { Link } from "react-router-dom"
import FormComponent from "./FormComponent.js"

function SignUpLogin({ textArrayToDisplay, emailNeeded, passwordNeeded, repeatPasswordNeeded, houseIdNeeded, mainButtonText, mark, smallText, smallButtonText }) {
    return (
        <div className="brown-gradient w-full flex flex-col lg:flex-row shadow-md rounded-lg my-10">
            {textArrayToDisplay && <div className="h-64 w-full lg:w-2/3 tracking-wider text-white font-bold rounded-lg flex flex-col items-center justify-center lg:mt-12">
                {textArrayToDisplay[0] && <p className="m-2 mr-20 text-4xl lg:text-6xl">{textArrayToDisplay[0]}</p>}
                {textArrayToDisplay[1] && <p className="m-2 ml-20 text-4xl lg:text-6xl">{textArrayToDisplay[1]}</p>}
                {textArrayToDisplay[2] && <p className="mt-10 text-xl">{textArrayToDisplay[2]}</p>}
            </div>}
            <div className="bg-white h-96 w-full lg:w-1/3 rounded-b-lg bg-opacity-15 flex items-center justify-center flex-col">
                <FormComponent emailNeeded={emailNeeded} passwordNeeded={passwordNeeded} repeatPasswordNeeded={repeatPasswordNeeded} houseIdNeeded={houseIdNeeded} buttonText={mainButtonText} />
                {mark && <p className="mt-3 mx-5 text-xs font-thin">{mark}</p>}
                <div className="flex mt-4 items-center justify-evenly">
                    {smallText && <p className="text-xs mx-1 font-thin">{smallText}</p>}
                    <Link to="/Login">
                        {smallButtonText && <button className="bg-light-brown text-xs w-20 mx-auto py-1 rounded-md">{smallButtonText}</button>}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpLogin