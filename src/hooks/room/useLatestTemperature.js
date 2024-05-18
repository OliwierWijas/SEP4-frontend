import { useState, useEffect } from 'react';

export function useLatestTemperature(deviceId) {
    const [latestTemperature, setLatestTemperature] = useState([]);

    useEffect(() => {
        if (deviceId && deviceId > 0) {
            const token = localStorage.getItem("jwt")

            
            const controller = new AbortController();
            const signal = controller.signal;

            fetch(`http://localhost:8080/humidity/${deviceId}/latest`, {
                signal, headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "GET"
            })
                .then(response => response.json())
                .then(data => setLatestTemperature(data))
                .catch(error => {
                    if (error.name !== "AbortError") {
                        console.log(`Error fetching latest temperature data: ${error}`);
                    }
                });


            return () => {
                controller.abort();
            }
        }
    }, [deviceId]);

    return latestTemperature;
}