function FormComponent({ emailNeeded, passwordNeeded, repeatPasswordNeeded, houseIdNeeded, buttonText }) {
    return (
        <form action="http://localhost:8080/signup" method="post" className="flex flex-col">
            {emailNeeded && <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="email" id="email" name="email" placeholder="email" required />}
            {passwordNeeded && <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="password" id="password" name="password" placeholder="password" required />}
            {repeatPasswordNeeded && <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="password" id="repeatpassword" name="repeatpassword" placeholder="repeat password" required />}
            {houseIdNeeded && <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" id="houseid" name="houseid" placeholder="house id" required />}
            {buttonText && <button className="bg-light-brown w-64 mx-auto my-1 py-5 rounded-md" type="submit">{buttonText}</button>}
        </form>
    )
}

export default FormComponent