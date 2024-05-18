import { useState, useEffect } from 'react';

export function useLatestLightLevel(deviceId) {
    const [latestLightLevel, setLatestLightLevel] = useState([]);

    useEffect(() => {
        if (deviceId && deviceId > 0) {
            const token = localStorage.getItem("jwt")

            const controller = new AbortController();
            const signal = controller.signal;

            fetch(`http://localhost:8080/light/${deviceId}/latest`, {
                signal, headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "GET"
            })
                .then(response => response.json())
                .then(data => setLatestLightLevel(data))
                .catch(error => {
                    if (error.name !== "AbortError") {
                        console.log(`Error fetching latest light level data: ${error}`);
                    }
                });


            return () => {
                controller.abort();
            }
        }
    }, [deviceId]);

    return latestLightLevel;
}