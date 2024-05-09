import { useState, useEffect } from "react";

export function useHumidity() {
    const [notificationData, setNotificationData] = useState(null)
    
    useEffect(() => {
        const controller = AbortController()
        const signal = controller.signal

        fetch('http://localhost:8080/notifications', { signal })
            .then(response => response.json())
            .then(data => setNotificationData(data))
            .catch(error => {
                if (error.name !== "AbortError") {
                    console.log(`Error fetching notifications: ${error}`)
                }
            })

        return () => {
            controller.abort()
        }
    }, [])

    return notificationData
}