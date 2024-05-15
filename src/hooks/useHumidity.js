import { useState, useEffect } from "react";
import { HumidityData } from "../dummyData/Humidity.js";
import { LightData } from "../dummyData/LightData.js";

export function useHumidity(roomId, interval) {
    const [humidityData, setHumidityData] = useState(null)

    function mockFetch(url, options) {
        const dummyResponse = {
            status: 200,
            headers: {
                'Content-type': 'application/json'
            },
            json: () => Promise.resolve({ message: HumidityData })
        };

        return Promise.resolve(dummyResponse);
    }

    window.fetch = mockFetch

    useEffect(() => {
        if (roomId < 0) {
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
        } else if (roomId === 1) {
            setHumidityData(LightData)
        } else {
            setHumidityData(HumidityData)
        }
    }, [roomId])

    return humidityData
}