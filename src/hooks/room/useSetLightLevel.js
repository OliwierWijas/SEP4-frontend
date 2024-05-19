export function useSetLightLevel() {
    const setLightLevel = async (room) => {
        try {
            const deviceId = room?.deviceId
            const level = room?.lightLevel
            if (deviceId > 0 && level !== undefined) {
                console.log("setting light")
                console.log(deviceId)
                console.log(level)
                const response = await fetch(`http://localhost:8080/rooms/${deviceId}/light/set`, {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(level),
                })
                if (response) {
                    const responseBody = await response.text();
                    const errorResponse = JSON.parse(responseBody);
                    const errorMessage = errorResponse.title;
                    alert(errorMessage);
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