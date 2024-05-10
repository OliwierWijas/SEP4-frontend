import { useState, useEffect } from "react";
import { TemperatureData } from "../dummyData/Temperature.js";
import { HumidityData } from "../dummyData/Humidity.js";

export function useTemperature(roomId, interval) {
    const [temperatureData, setTemperatureData] = useState(null)

    function mockFetch(url, options) {
        const dummyResponse = {
            status: 200,
            headers: {
                'Content-type': 'application/json'
            },
            json: () => Promise.resolve({ message: TemperatureData })
        };

        return Promise.resolve(dummyResponse);
    }

    window.fetch = mockFetch

    useEffect(() => {
        if (roomId < 0) {
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
        } else if (roomId === 1) {
            setTemperatureData(HumidityData)
        } else {
            setTemperatureData(TemperatureData)
        }
    }, [roomId])

    return temperatureData
}