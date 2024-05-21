import { useState, useEffect } from "react";
import formattedHumidityData from "../../dummyData/Humidity.js";

export function useHumidityHistory(deviceId, interval) {
    const [humidityData, setHumidityData] = useState(null)

    useEffect(() => {
        if (deviceId > 0 && interval?.startDate && interval?.endDate) {
            const controller = new AbortController()
            const signal = controller.signal

            const token = localStorage.getItem("jwt")

            fetch(`http://localhost:8080/humidity/${deviceId}/history?dateFrom=${interval?.startDate}&dateTo=${interval?.endDate}`, {
                signal, headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    const formattedHumidityData = data.map((temp) => ({
                        ...temp,
                        readAt: temp.readAt.split('T')[0]
                    }));
                    setHumidityData(formattedHumidityData)
                })
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

    return formattedHumidityData
}