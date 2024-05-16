import { useEffect, useState } from "react"
import roomData from "../../dummyData/RoomData.js"

export function useGetWindowStatus({ deviceId }) {
    const [windowStatus, setWindowStatus] = useState(null);

    useEffect(() => {
        if (deviceId === undefined) {
            console.log("window roomId not defined")
            return
        }
        const room = roomData.find(r => r.id === deviceId)
        if (room) {
            setWindowStatus(room.window)
        }
    }, [deviceId])

    return windowStatus
}