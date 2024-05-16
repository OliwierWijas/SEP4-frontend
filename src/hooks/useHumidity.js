import { useState, useEffect } from "react";

export function useHumidity({ deviceId, interval }) {
    const [humidityData, setHumidityData] = useState(null)

    useEffect(() => {
        if (deviceId > 0 && interval?.startDate && interval?.endDate) {
            const controller = new AbortController()
            const signal = controller.signal

            fetch(`http://localhost:8080/humidity/${deviceId}/history?dateFrom=${interval?.startDate}&dateTo=${interval?.endDate}`, { signal })
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
    }, [deviceId, interval])

    return humidityData
}