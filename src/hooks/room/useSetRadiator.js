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
                    body: JSON.stringify(level),
                }).catch(error => alert(`Error setting radiator level: ${error}`))
                if (response) {
                    const responseBody = await response.text()
                    const errorResponse = JSON.parse(responseBody)
                    const errorMessage = errorResponse.title
                    alert(errorMessage)
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