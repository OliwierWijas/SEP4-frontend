export async function useLogin(user) {
    const login = async () => {
        const response = await fetch("http://localhost:8080/auth/login", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(user),
        })
        if (response.ok) {
            const token = await response.text()
            localStorage.setItem("jwt", token)

            const claims = decodeJWT(token)

            const username = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            const role = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            const houseId = claims.HouseId;

            localStorage.setItem("username", username)
            localStorage.setItem("password", user?.password)
            localStorage.setItem("role", role)
            localStorage.setItem("houseId", houseId)
        } else {
            const responseBody = await response.text();
            try {
                const errorResponse = JSON.parse(responseBody);
                const errorMessage = errorResponse.title;
                alert(errorMessage);
            } catch (error) {
                alert(responseBody);
            }
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