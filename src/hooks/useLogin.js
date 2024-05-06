export async function useLogin(user) {
    const login = async () => {
        const response = await fetch("http://localhost:8080/login", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(user),
        })
        if (response.ok) {
            const authString = response.headers.get("Authorization")
            const token = authString?.split(" ")[1]
            localStorage.setItem("jwt", token)
        }
    }

    await login()
}