export function useLockState() {
    const getLockState = (houseId, token) => {
        try {
            if (houseId > 0) {
                const response = fetch(`http://localhost:8080/door/houses/${houseId}`, {
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    method: "GET",
                })
                if (response) {
                    const responseBody = response.text()
                    return responseBody
                }
            }
        } catch (error) {
            console.log("Error getting current house lock state.")
        }
    }

    return getLockState
}