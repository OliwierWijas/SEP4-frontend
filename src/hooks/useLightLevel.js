import { useState, useEffect } from "react";

export function useLightLevel(roomId, interval) {
    const [lightLevelData, setLightLevelData] = useState(null)

    useEffect(() => {
        if (roomId > 0) {
            const controller = new AbortController()
            const signal = controller.signal

            fetch(`https://localhost:8080/light/history/${roomId}`, { signal })
                .then(response => response.json())
                .then(data => setLightLevelData(data))
                .catch(error => {
                    if (error.name !== "AbortError") {
                        console.log(`Error fetching light level data: ${error}`)
                    }
                })

            return () => {
                controller.abort()
            }
        }
    }, [roomId])

    return lightLevelData
}