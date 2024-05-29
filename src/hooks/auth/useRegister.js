export async function useRegister(username, password) {
    const user = { username: username, password: password }
    const register = async () => {
        const response = await fetch("http://172.214.63.232:80/auth/register", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(user),
        })

        if (response.ok) {
            alert("Account has been created.")
        }
        else {
            const responseBody = await response.text();
            alert(responseBody)
        }
    }

    await register()
}