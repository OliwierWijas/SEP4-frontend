export function useSwitchWindow() {
    const switchWindow = async (room) => {
        try {
            const deviceId = room?.deviceId
            const state = room?.isWindowOpen
            console.log("setting window")
            console.log(deviceId)
            console.log(state)
            if (deviceId > 0 && state !== undefined) {
                const response = await fetch(`http://localhost:8080/rooms/${deviceId}/window/set`, {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(state),
                })
                if (response) {
                    const responseBody = await response.text();
                    const errorResponse = JSON.parse(responseBody);
                    const errorMessage = errorResponse.title;
                    alert(errorMessage);
                } else {
                    alert("Error while changing the status of window.")
                }
            }
        } catch (error) {
            alert("Error while changing the status of window.")
        }
    }
    return switchWindow
}