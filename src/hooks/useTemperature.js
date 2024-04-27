import { useState, useEffect } from "react";

export function useTemperature() {
    const [temperatureData, setTemperatureData] = useState(null)

    useEffect(() => {
        const controller = AbortController()
        const signal = controller.signal

        fetch('https://localhost:8080/reading/temperature', { signal })
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
    }, [])

    return temperatureData
}