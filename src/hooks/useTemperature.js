import { useState, useEffect } from "react";

export function useTemperature(roomId, interval) {
    const [temperatureData, setTemperatureData] = useState(null)

    useEffect(() => {
        if (roomId > 0) {
            const controller = new AbortController()
            const signal = controller.signal

            fetch(`https://localhost:8080/temperature/history/${roomId}`, { signal })
                .then(response => response.json())
                .then(data => setTemperatureData(data))
                .catch(error => {
                    if (error.name !== "AbortError") {
                        console.log(`Error fetching temperature data: ${error}`)
                    }
                })

            return () => {
                controller.abort()
            }
        }
    }, [roomId])

    return temperatureData
}