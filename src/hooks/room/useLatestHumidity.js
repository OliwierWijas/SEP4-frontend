import { useState, useEffect } from 'react';

//not used
export function useLatestHumidity(deviceId) {
    const [latestHumidity, setLatestHumidity] = useState([]);

    useEffect(() => {
        if (deviceId && deviceId > 0) {
            const token = localStorage.getItem("jwt")

            const controller = new AbortController();
            const signal = controller.signal;

            /*fetch(`http://localhost:8080/humidity/${deviceId}/latest`, {
                signal, headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                method: "GET"
            })
            .then(response => response.json())
                .then(data => setLatestHumidity(data))
                .catch(error => {
                    if (error.name !== "AbortError") {
                        console.log(`Error fetching latest humidity data: ${error}`);
                    }
                });*/


            return () => {
                controller.abort();
            }
        }
    }, [deviceId]);

    return 3;
}