export async function useRegister(username, password) {
    const user = { username: username, password: password }
    const register = async () => {
        const response = await fetch("http://localhost:8080/auth/register", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(user),
        })

        if (!response.ok) {
            if (response.body) {
                let responseBody = ''
                const reader = response.body.getReader()

                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break;
                    responseBody += new TextDecoder().decode(value)
                }

                alert(responseBody)
            } else {
                alert("An error occurred during signing up.")
            }
        } else {
            alert("Account has been created.")
        }
    }

    await register()
}