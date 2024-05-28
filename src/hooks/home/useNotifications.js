import { useState, useEffect } from "react";

export function useNotifications(homeId, token) {
    const [notificationsData, setNotificationsData] = useState(null)

    useEffect(async () => {
        if (homeId > 0) {
            const controller = new AbortController()
            const signal = controller.signal
            
            const fetchData = async () => {
                await fetch(`http://localhost:8080/notifications/${homeId}`, {
                    signal, headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        setNotificationsData(data)
                    })
                    .catch(error => {
                        if (error.name !== "AbortError") {
                            alert(`Error fetching notifications: ${error}`)
                        }
                    })

                return () => {
                    controller.abort()
                }
            }

            await fetchData()

            const interval = setInterval(fetchData, 5 * 60 * 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [homeId, token])

    return notificationsData
}