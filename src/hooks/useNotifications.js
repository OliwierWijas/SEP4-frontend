import { useState, useEffect } from "react";

export function useNotifications({ houseId }) {
    const [notificationsData, setNotificationsData] = useState(null)

    useEffect(() => {
        if (houseId > 0) {
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
        }
    }, [houseId])

    return notificationsData
}