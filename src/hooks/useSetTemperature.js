import { useEffect } from "react"

export function useSetTemperature({ deviceId, temperaturelevel }) {
    useEffect(() => {
        if (deviceId > 0 && temperaturelevel !== undefined) {
            const setTemperature = async () => {
                const response = await fetch(`http://localhost:8080/temperature/${deviceId}/set`, {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(temperaturelevel),
                })
                if (response.ok) {
                    return `Temperature has been set to ${temperaturelevel}.`
                }
                else {
                    return "Error while setting temperature."
                }
            }
            setTemperature()
        }
    }, [deviceId, temperaturelevel])
}