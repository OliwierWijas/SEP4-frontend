import { useState, useEffect } from "react";

export function useTemperatureHistory(deviceId, interval) {
    const [temperatureData, setTemperatureData] = useState(null)

    useEffect(() => {
        if (deviceId > 0 && interval?.startDate && interval?.endDate) {
            const controller = new AbortController()
            const signal = controller.signal
            
            const token = localStorage.getItem("jwt")

            const endDate = new Date(interval.endDate);
            endDate.setDate(endDate.getDate() + 1);

            fetch(`http://localhost:8080/temperature/${deviceId}/history?dateFrom=${interval?.startDate}&dateTo=${endDate}`,  {
                signal, headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "GET"
            })
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