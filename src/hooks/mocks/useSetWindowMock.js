import { useEffect } from "react"
import roomData from "../../dummyData/RoomData.js"

export function useSetWindow({ deviceId, windowStatus }) {
    useEffect(() => {
        if (deviceId === undefined || deviceId === null || windowStatus === undefined || windowStatus === null) {
            return
        }
        if (roomData.find(r => r.id === deviceId)) {
            roomData.find(r => r.id === deviceId).window = windowStatus
        }

        return () => { }
    }, [deviceId, windowStatus])
}