export function useChangeLockPassword() {
    const changeLockPassword = async (houseId, newPassword) => {
        try {
            if (houseId > 0) {
                console.log(houseId)
                console.log(JSON.stringify(newPassword))
                const token = localStorage.getItem("jwt")

                const response = await fetch(`http://localhost:8080/door/houses/${houseId}/doors/password`, {
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