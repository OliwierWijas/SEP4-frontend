export async function useDeleteAccount({ username, password }) {
    const token = localStorage.getItem("jwt")
    const response = await fetch(`http://localhost:8080/auth/delete/users/${username}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "DELETE",
        body: JSON.stringify({ username: username, password: password })
    })
    if (response.ok) {
        alert("Account has been deleted.")
    }
    else {
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