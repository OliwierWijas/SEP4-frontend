import { useState, useEffect } from "react";

export function useLightLevelHistory(deviceId, interval, token) {
    const [lightLevelData, setLightLevelData] = useState(null)

    useEffect(async () => {
        if (deviceId > 0 && interval?.startDate && interval?.endDate) {
            const controller = new AbortController()
            const signal = controller.signal

            const temp = new Date(interval.endDate);
            temp.setDate(temp.getDate() + 1);

            let dateFrom = JSON.stringify(interval?.startDate).replace(/"/g, '')
            let dateTo = JSON.stringify(temp).replace(/"/g, '')

            await fetch(`http://localhost:8080/light/${deviceId}/history?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
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
    }, [deviceId, interval, token])

    return lightLevelData
}