export function useEditPassword() {
    const editPassword = async (username, editedAccount, setClaims, token) => {
        try {
            if (username !== undefined && username !== null && username !== '' && editedAccount !== null && editedAccount !== undefined) {

                const response = await fetch(`http://172.214.63.209:80/auth/edit/${username}/password`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "PUT",
                    body: JSON.stringify(editedAccount),
                })
                if (response) {
                    const responseBody = await response.text()
                    if (response.ok) {
                        setClaims(prevClaims => ({
                            ...prevClaims,
                            password: editedAccount?.newPassword
                        }));
                    }
                    alert(responseBody)
                }
            }
        } catch (error) {
            alert("Error while editing password.")
        }
    }
    return editPassword
}