import { useState, useEffect } from "react";

export function useHumidity() {
    const [humidityData, setHumidityData] = useState(null)

    useEffect(() => {
        const controller = AbortController()
        const signal = controller.signal

        fetch('https://localhost:8080/reading/humidity', { signal })
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
    }, [])

    return humidityData
}