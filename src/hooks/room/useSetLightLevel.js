export function useSetLightLevel() {
    const setLightLevel = async (room) => {
        try {
            const deviceId = room?.deviceId
            const level = room?.lightLevel
            if (deviceId > 0 && level !== undefined) {
                const token = localStorage.getItem("jwt")
                const response = await fetch(`http://localhost:8080/rooms/${deviceId}/light/set`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "POST",
                    body: JSON.stringify(level),
                }).catch(error => alert(`Error setting light level: ${error}`))
                if (response) {
                    const responseBody = await response.text()
                    const errorResponse = JSON.parse(responseBody)
                    const errorMessage = errorResponse.title
                    alert(errorMessage)
                } else {
                    alert("Error while changing light level.")
                }
            }
        } catch (error) {
            alert("Error while changing light level.")
        }
    }

    return setLightLevel
}