export function useSwitchWindow() {
    const switchWindow = async (room, token) => {
        try {
            const deviceId = room?.deviceId
            const state = room?.isWindowOpen
            if (deviceId > 0 && state !== undefined) {
                const response = await fetch(`http://172.214.63.232:80/rooms/${deviceId}/window/set`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    method: "POST",
                    body: JSON.stringify(state),
                }).catch(error => alert(`Error setting window state: ${error}`))
                if (response) {
                    const responseBody = await response.text()
                    alert(responseBody)
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