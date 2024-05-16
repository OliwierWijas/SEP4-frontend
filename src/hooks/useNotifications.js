import { useState, useEffect } from "react";

export function useNotifications({ homeId }) {
    const [notificationsData, setNotificationsData] = useState(null)

    useEffect(() => {
        if (homeId > 0) {
            const controller = new AbortController()
            const signal = controller.signal

            const fetchData = () => {
                fetch(`http://localhost:8080/notifications?homeId=${homeId}`, { signal })
                    .then(response => response.json())
                    .then(data => {
                        setNotificationsData(data)
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

            const interval = setInterval(fetchData, 5 * 60 * 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [homeId])

    return notificationsData
}