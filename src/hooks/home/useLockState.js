export function useLockState() {
    const getLockState = async (houseId, token) => {
        try {
            if (houseId > 0) {
                const response = await fetch(`http://172.214.63.232:80/door/houses/${houseId}`, {
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    method: "GET",
                })
                if (response) {
                    const responseBody = await response.text()
                    return responseBody
                }
            }
        } catch (error) {
            console.log("Error getting current house lock state.")
        }
    }

    return getLockState
}