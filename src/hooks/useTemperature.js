import { useState, useEffect } from "react";

export function useTemperature({ deviceId, interval }) {
    const [temperatureData, setTemperatureData] = useState(null)

    useEffect(() => {
        if (deviceId > 0 && interval?.startDate && interval?.endDate) {
            const controller = new AbortController()
            const signal = controller.signal

            fetch(`http://localhost:8080/temperature/${deviceId}/history?dateFrom=${interval?.startDate}&dateTo=${interval?.dateTo}`, { signal })
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
    }, [deviceId, interval])

    return temperatureData
}