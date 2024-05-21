import { useState, useEffect } from "react";
import formattedLightData from "../../dummyData/LightData.js";

export function useLightLevelHistory(deviceId, interval) {
    const [lightLevelData, setLightLevelData] = useState(null)

    useEffect(() => {
        if (deviceId > 0 && interval?.startDate && interval?.endDate) {
            const controller = new AbortController()
            const signal = controller.signal

            const token = localStorage.getItem("jwt")

            fetch(`http://localhost:8080/light/${deviceId}/history?dateFrom=${interval?.startDate}&dateTo=${interval?.endDate}`, {
                signal, headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    const formattedLightData = data.map((temp) => ({
                        ...temp,
                        readAt: temp.readAt.split('T')[0]
                    }));
                    setLightLevelData(formattedLightData)
                })
                .catch(error => {
                    if (error.name !== "AbortError") {
                        console.log(`Error fetching light level data: ${error}`)
                    }
                })

            return () => {
                controller.abort()
            }
        }
    }, [deviceId, interval])

    return formattedLightData
}