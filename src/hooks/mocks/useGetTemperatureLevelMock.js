import { useEffect, useState } from "react"
import roomData from "../../dummyData/RoomData.js"

export function useGetTemperature({ deviceId }) {
    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        if (deviceId === undefined) {
            console.log("temp roomId not defined")
            return
        }
        const room = roomData.find(r => r.id === deviceId)
        if (room) {
            console.log(deviceId)
            console.log(room)
            console.log(room.radiatorLevel)
            setTemperature(5)
        }
    }, [deviceId])

    return temperature
}