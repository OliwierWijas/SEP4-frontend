export function useLockState() {
    const getLockState = async (houseId) => {
        try {
            if (houseId > 0) {
                const token = localStorage.getItem("jwt")

                const response = await fetch(`http://localhost:8080/door/houses/${houseId}`, {
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    method: "GET",
                }).catch(error => alert(`Error getting current house lock state: ${error}`))
                if (response) {
                    const responseBody = await response.text()
                    return responseBody
                } else {
                    alert("Error getting current house lock state.")
                }
            }
        } catch (error) {
            alert("Error getting current house lock state.")
        }
    }

    return getLockState
}