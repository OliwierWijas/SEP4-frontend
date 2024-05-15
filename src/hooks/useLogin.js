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
            console.log(localStorage.getItem("jwt"))

            const claims = decodeJWT(token)
            localStorage.setItem("claims", claims)
            console.log(localStorage.getItem("claims"))
        }
    }

    function decodeJWT(token) {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
    
        return JSON.parse(jsonPayload);
    }

    await login()
}