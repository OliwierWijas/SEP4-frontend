import { useState } from "react";

function FormComponent({ usernameNeeded, passwordNeeded, repeatPasswordNeeded, buttonText, action }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const onSubmit = (event) => {
        event.preventDefault()

        if (usernameNeeded && (username === undefined || username === "")) {
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

        action(username, password)
    }

    return (
        <form className="flex flex-col">
            {usernameNeeded && <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="text" id="username" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} required />}
            {passwordNeeded && <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="password" id="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />}
            {repeatPasswordNeeded && <input className="w-64 my-1 p-1 rounded-md focus:outline-none placeholder-gray-300 focus:opacity-75 hover:opacity-75" type="password" id="repeatpassword" name="repeatpassword" placeholder="repeat password" onChange={(e) => setRepeatPassword(e.target.value)} required />}
            {buttonText && <button className="bg-light-brown w-64 mx-auto my-1 py-5 rounded-md" type="submit" onClick={onSubmit}>{buttonText}</button>}
        </form>
    )
}

export default FormComponent