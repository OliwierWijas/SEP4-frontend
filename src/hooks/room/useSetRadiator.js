export function useSetRadiator() {
    const setRadiator = async (room, token) => {
        try {
            const deviceId = room?.deviceId
            const level = room?.radiatorState
            if (deviceId > 0 && level !== undefined) {
                const response = await fetch(`http://172.214.63.209:80/rooms/${deviceId}/radiator/set`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "POST",
                    body: level,
                }).catch(error => alert(`Error setting radiator level: ${error}`))
                if (response.ok) {
                    const responseBody = await response.text()
                    alert(responseBody)
                } else {
                    alert("Error while setting changing radiator level.")
                }
            }
        } catch (error) {
            alert("Error while setting changing radiator level.")
        }
    }
    return setRadiator
}