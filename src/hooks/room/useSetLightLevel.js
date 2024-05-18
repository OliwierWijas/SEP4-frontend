import { useEffect } from "react"

export function useSetLightLevel({ deviceId, lightLevel }) {
    useEffect(() => {
        if (deviceId > 0 && lightLevel !== undefined) {
            const setLightLevel = async () => {
                const response = await fetch(`http://localhost:8080/temperature/${deviceId}/set`, {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(lightLevel),
                })
                if (response.ok) {
                    return `Light level has been set to ${lightLevel}.`
                }
                else {
                    return "Error while setting temperature."
                }
            }
            setLightLevel()
        }
    }, [deviceId, lightLevel])
}