import { useState, useEffect } from "react";

export function useHumidity(roomId, interval) {
    const [humidityData, setHumidityData] = useState(null)

    useEffect(() => {
        if (roomId > 0) {
            const controller = new AbortController()
            const signal = controller.signal

            fetch(`https://localhost:8080/humidity/history/${roomId}`, { signal })
                .then(response => response.json())
                .then(data => setHumidityData(data))
                .catch(error => {
                    if (error.name !== "AbortError") {
                        console.log(`Error fetching humidity data: ${error}`)
                    }
                })

            return () => {
                controller.abort()
            }
        }
    }, [roomId])

    return humidityData
}