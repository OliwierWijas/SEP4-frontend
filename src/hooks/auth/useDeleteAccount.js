export async function useDeleteAccount(username, password) {
    const user = { username: username, password: password }
    const deleteAccount = async () => {
        const token = localStorage.getItem("jwt")
        const response = await fetch(`http://localhost:8080/auth/delete/users/${username}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            method: "DELETE",
            body: JSON.stringify(user)
        })
        if (response.ok) {
            localStorage.clear()
            alert("Account has been deleted.")
        }
        else {
            const responseBody = await response.text();
            alert(responseBody)
        }
    }

    await deleteAccount()
}