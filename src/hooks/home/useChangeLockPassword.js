export function useChangeLockPassword() {
    const changeLockPassword = async (houseId, newPassword, token) => {
        try {
            if (houseId > 0) {
                const response = await fetch(`http://172.214.63.209:80/door/houses/${houseId}/doors/password`, {
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    method: "PUT",
                    body: JSON.stringify(newPassword)
                }).catch(error => alert(`Error getting current house lock state: ${error}`))
                if (response) {
                    const responseBody = await response.text()
                    alert(responseBody)
                } else {
                    alert("Error getting current house lock state.")
                }
            }
        } catch (error) {
            alert("Error getting current house lock state.")
        }
    }

    return changeLockPassword
}