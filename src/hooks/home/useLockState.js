export function useLockState() {
    const getLockState = async (houseId) => {
        try {
            if (houseId > 0) {
                console.log("getting lock state")
                const token = localStorage.getItem("jwt")

                //change url
                const response = await fetch(`http://localhost:8080/door/houses/${houseId}/doors/switch`, {
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    method: "POST",
                }).catch(error => alert(`Error getting current house lock state: ${error}`))
                if (response) {
                    const responseBody = await response.text()
                    return re
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