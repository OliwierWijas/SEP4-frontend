import { Link } from "react-router-dom"

function SignUp() {

    return (
        <>
            <div style={{ height: `${window.innerHeight}px` }} className="flex items-center">
                <div className="brown-gradient w-full flex flex-col lg:flex-row shadow-md rounded-lg">
                    <div className="h-64 w-full lg:w-2/3 tracking-wider text-white font-bold rounded-lg flex flex-col items-center justify-center lg:mt-12">
                        <p className="m-2 mr-20 text-4xl lg:text-6xl">Smart Home</p>
                        <p className="m-2 ml-20 text-4xl lg:text-6xl">Smart Living</p>
                        <p className="mt-10 text-xl">Join Now</p>
                    </div>
                    <div className="bg-white h-96 w-full lg:w-1/3 rounded-b-lg bg-opacity-15 flex items-center justify-center flex-col">
                        <form action="http://localhost:8080/signup" method="post" className="flex flex-col">
                            <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="email" id="email" name="email" placeholder="email" required />
                            <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="password" id="password" name="password" placeholder="password" required />
                            <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="password" id="repeatpassword" name="repeatpassword" placeholder="repeat password" required />
                            <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" id="houseid" name="houseid" placeholder="house id" required />
                            <button className="bg-light-brown w-64 mx-auto my-1 py-5 rounded-md" type="submit">Sign Up</button>
                        </form>
                        <p className="mt-3 mx-5 text-xs font-thin">* In order to sign up, a bought set of house hardware is required.</p>
                        <div className="flex mt-4 items-center">
                            <p className="mx-5 text-xs font-thin">Already have an account?</p>
                            <Link to="/Login">
                                <button className="bg-light-brown text-xs w-20 mx-auto py-1 rounded-md">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp