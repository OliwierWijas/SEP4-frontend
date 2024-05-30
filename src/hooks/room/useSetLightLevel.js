export function useSetLightLevel() {
    const setLightLevel = async (room, token) => {
        try {
            const deviceId = room?.deviceId
            const level = room?.lightLevel
            if (deviceId > 0 && level !== undefined) {
                const response = await fetch(`http://172.214.63.232:80/rooms/${deviceId}/light/set`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "POST",
                    body: level
                }).catch(error => alert(`Error setting light level: ${error}`))
                if (response) {
                    const responseBody = await response.text()
                    alert(responseBody)
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