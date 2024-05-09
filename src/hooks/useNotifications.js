import { useState, useEffect } from "react";
import notificationData from "../dummyData/Notifications.js";

export function useNotifications() {
    const [notificationsData, setNotificationsData] = useState(null)

    function mockFetch(url, options) {
        const dummyResponse = {
            status: 200,
            headers: {
                'Content-type': 'application/json'
            },
            json: () => Promise.resolve({ message: notificationData })
        };

        return Promise.resolve(dummyResponse);
    }

    window.fetch = mockFetch

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        fetch('http://localhost:8080/notifications', { signal })
            .then(response => response.json())
            .then(data => setNotificationsData(data))
            .catch(error => {
                if (error.name !== "AbortError") {
                    console.log(`Error fetching notifications: ${error}`)
                }
            })

        return () => {
            controller.abort()
        }
    }, [])

    return notificationsData
}