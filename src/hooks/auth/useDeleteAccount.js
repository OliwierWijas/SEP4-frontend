export function useDeleteAccount() {
    const deleteAccount = async (username, password, setClaims, token) => {
        const user = { username: username, password: password }
        if (username !== null && username !== undefined && password !== null && password !== undefined) {
            const response = await fetch(`http://172.214.63.232:80/auth/delete/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "DELETE",
                body: JSON.stringify(user)
            })
            if (response.ok) {
                alert("Account has been deleted.")
                return true
            }
            else {
                const responseBody = await response.text();
                alert(responseBody)
            }
        } else {
            alert("Username or password undefined.")
        }
    }

    return deleteAccount
}