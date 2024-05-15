import { useState, useEffect } from "react";
import { LightData } from "../dummyData/LightData.js";
import { TemperatureData } from "../dummyData/Temperature.js";

export function useLightLevel(roomId, interval) {
    const [lightLevelData, setLightLevelData] = useState(null)

    function mockFetch(url, options) {
        const dummyResponse = {
            status: 200,
            headers: {
                'Content-type': 'application/json'
            },
            json: () => Promise.resolve({ message: LightData })
        };

        return Promise.resolve(dummyResponse);
    }

    window.fetch = mockFetch

    useEffect(() => {
        if (roomId < 0) {
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
        } else if (roomId === 1) {
            setLightLevelData(TemperatureData)
        } else {
            setLightLevelData(LightData)
        }
    }, [roomId])

    return lightLevelData
}