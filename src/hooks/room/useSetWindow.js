import { useEffect } from "react"

export function useSwitchWindow({ deviceId, status }) {
    useEffect(() => {
        if (deviceId > 0 && status !== undefined) {
            const switchWindow = async () => {
                const response = await fetch(`http://localhost:8080/window?deviceId=${deviceId}/switch`, {
                    headers: { "Content-Type": "application/json" },
                    method: "POST"
                })
                if (response.ok) {
                    if (status) {
                        return "Window has been opened."
                    } else {
                        return "Window has been closed."
                    }
                }
                else {
                    return "Error while changing the status of window."
                }
            }
            switchWindow()
        }
    }, [deviceId, status])
}