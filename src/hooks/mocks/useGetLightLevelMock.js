import { useEffect, useState } from "react"
import roomData from "../../dummyData/RoomData.js"

export function useGetLight({ deviceId }) {
    const [light, setLight] = useState(null);

    useEffect(() => {
        if (deviceId === undefined) {
            return
        }
        const room = roomData.find(r => r.id === deviceId)
        if (room) {
            setLight(room?.lightLevel)
        }
    }, [deviceId])

    return light
}