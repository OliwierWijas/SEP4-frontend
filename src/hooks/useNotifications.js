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

        const fetchData = () => {
            fetch('http://localhost:8080/notifications', { signal })
                .then(response => response.json())
                .then(data => {
                    setNotificationsData(data)
                    console.log(data)
                })
                .catch(error => {
                    if (error.name !== "AbortError") {
                        console.log(`Error fetching notifications: ${error}`)
                    }
                })

            return () => {
                controller.abort()
            }
        }

        fetchData()

        const interval = setInterval(fetchData, 5 * 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return notificationsData
}