function FormComponent({ emailNeeded, passwordNeeded, repeatPasswordNeeded, houseIdNeeded, buttonText, action }) {
    const onSubmit = (event) => {
        event.preventDefault()
        const email = document.getElementById('email')?.value
        const password = document.getElementById('password')?.value
        const repeatPassword = document.getElementById('repeatpassword')?.value
        const houseId = document.getElementById('houseid')?.value

        if (emailNeeded && (email === undefined || email === "")) {
            alert("Please fill in all required fields.")
            return
        }

        if (passwordNeeded && repeatPasswordNeeded) {
            if (password === undefined || repeatPassword === undefined || password === "" || repeatPassword === "") {
                alert("Please fill in all required fields.")
                return
            } else if (password !== repeatPassword) {
                alert("Passwords do not match")
                return
            }
        }

        if (houseIdNeeded && (houseId === undefined || houseId === '0')) {
            alert("Please fill in all required fields.")
            return
        }

        action(email, password, houseId)
    }

    return (
        <form className="flex flex-col">
            {emailNeeded && <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="email" id="email" name="email" placeholder="email" required />}
            {passwordNeeded && <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="password" id="password" name="password" placeholder="password" required />}
            {repeatPasswordNeeded && <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="password" id="repeatpassword" name="repeatpassword" placeholder="repeat password" required />}
            {houseIdNeeded && <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="number" id="houseid" name="houseid" placeholder="house id" required />}
            {buttonText && <button className="bg-light-brown w-64 mx-auto my-1 py-5 rounded-md" type="submit" onClick={onSubmit}>{buttonText}</button>}
        </form>
    )
}

export default FormComponent