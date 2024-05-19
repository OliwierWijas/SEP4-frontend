export function useSetRadiator() {
    const setRadiator = async (room) => {
        try {
            const deviceId = room?.deviceId
            const level = room?.radiatorState
            console.log("setting radiator")
            console.log(deviceId)
            console.log(level)
            if (deviceId > 0 && level !== undefined) {
                const response = await fetch(`http://localhost:8080/rooms/${deviceId}/radiator/set`, {
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
                    alert("Error while setting changing radiator level.")
                }
            }
        } catch (error) {
            alert("Error while setting changing radiator level.")
        }
    }
    return setRadiator
}