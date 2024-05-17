import { useEffect, useState } from "react"
import roomData from "../../dummyData/RoomData.js"

export function useGetTemperature({ deviceId }) {
    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        if (deviceId === undefined) {
            return
        }
        const room = roomData.find(r => r.id === deviceId)
        if (room) {
            setTemperature(room.radiatorLevel)
        }
    }, [deviceId])

    return temperature
}