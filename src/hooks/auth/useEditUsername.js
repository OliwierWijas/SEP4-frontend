export function useEditUsername() {
    const editUsername = async (username, editedAccount, setClaims, token) => {
        try {
            if (username !== undefined || username !== null || username !== '' || editedAccount !== null || editedAccount !== undefined) {

                const response = await fetch(`http://localhost:8080/auth/edit/${username}/username`, {
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
                            username: editedAccount?.newUsername
                        }));
                    }
                    alert(responseBody)
                }
            }
        } catch (error) {
            alert("Error while editing username.")
        }
    }
    return editUsername
}