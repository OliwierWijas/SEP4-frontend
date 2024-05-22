export function useEditPassword() {
    const editPassword = async (username, editedAccount) => {
        try {
            if (username !== undefined && username !== null && username !== '' && editedAccount !== null && editedAccount !== undefined) {
                const token = localStorage.getItem("jwt")

                const response = await fetch(`http://localhost:8080/auth/edit/${username}/password`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "PUT",
                    body: JSON.stringify(editedAccount),
                })
                if (response) {
                    const responseBody = await response.text()
                    if (response.ok)
                        localStorage.setItem("password", editedAccount.newPassword)
                    alert(responseBody)
                }
            }
        } catch (error) {
            alert("Error while editing password.")
        }
    }
    return editPassword
}