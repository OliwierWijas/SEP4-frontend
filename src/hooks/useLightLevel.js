import { useState, useEffect } from "react";

export function useLightLevel() {
    const [lightLevelData, setLightLevelData] = useState(null)

    useEffect(() => {
        const controller = AbortController()
        const signal = controller.signal

        fetch('https://localhost:8080/reading/light', { signal })
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
    }, [])

    return lightLevelData
}