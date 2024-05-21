export function useSetRadiator() {
    const setRadiator = async (room) => {
        try {
            const deviceId = room?.deviceId
            const level = room?.radiatorState
            if (deviceId > 0 && level !== undefined) {
                const token = localStorage.getItem("jwt")
                const response = await fetch(`http://localhost:8080/rooms/${deviceId}/radiator/set`, {
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